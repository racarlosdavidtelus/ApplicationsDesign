var express = require('express');
var router = express.Router();
const pool = require('../databases_connections/mysql_connection');
const mongoConnection = require('../databases_connections/mongo_connection');

router.post('/signup', function(req, res) {
    console.log(req.body)
    const url_photo = "https://aws.com"
    const {name,password,pokemon_trainer_nickname,region_of_origin
        ,gender,age,email,trainer_class}=req.body;
    try {// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
        // verificando correo 
        pool.query("SELECT * FROM user WHERE email=? ;", [email], function(err,result){
            if (err) throw err;
            if (result.length == 0) {
                //guardarEnS3(nombreUsuario,miFile,nombreFile)
                //let path = 'https://archivos-22pareja-p1.s3.us-east-2.amazonaws.com/'+nombreUsuario+"/"+nombreFile;
                //inserto en db
                let id_usuario;
                var sql = "INSERT INTO user (name,password,pokemon_trainer_nickname,region_of_origin,gender,age,email,trainer_class,url_photo) VALUES(?,?,?,?,?,?,?,?,?);";
                pool.query(sql, [name,password,pokemon_trainer_nickname,region_of_origin,gender,age,email,trainer_class,url_photo], function(err,result){
                    if (err) throw err;
                    if(result.length != 0){
                        id_usuario=result.insertId;
                    }
                });
              console.log("Nuevo Usuario agregado a la BASE DE DATOS")
              res.status(201).json({msj: 'User Created',error: null});
            }else{
              res.status(409).json({msj: 'The email already exists in the database',error: true}); 
            }
          });
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj: "error", error: er});
    }
});

router.put('/update', function(req, res) {
    //console.log(req.body)
    const {name,password,pokemon_trainer_nickname,region_of_origin
        ,gender,age,email,trainer_class}=req.body;
    try {// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
        // verificando correo 
        pool.query("SELECT * FROM user WHERE email=? ;", [email], function(err,result){
            if (err) throw err;
            if (result.length != 0) { 
                //actualizo el registro en db
                var sql = "UPDATE user SET name=?,password=?,pokemon_trainer_nickname=?,region_of_origin=?,gender=?,age=?,email=?,trainer_class=?;";
                pool.query(sql, [name,password,pokemon_trainer_nickname,region_of_origin,gender,age,email,trainer_class], function(err,result){
                    if (err) throw err;
                    if(result.length != 0){
                        res.status(204).json({msj: 'User info updated', error: null});
                    }
                });
              
            }else{
              res.status(409).json({msj: 'The user dont exists in the database', error: true}); 
            }
          });
    } catch (er) {
        //console.log(er);
        res.status(500).json({msj: 'error when update user info',error: er});
    }
});

router.post('/login', function(req, res) {
    const {user,password}=req.body;
    const email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    const isEmail = email.exec(user);
    let query="";
    if (!isEmail) {
      query = "SELECT * FROM user WHERE name=?;"
      console.log('El usuario quiere ingresar con nombre: ' + user);
    } else {
      query = "SELECT * FROM user WHERE email=?;"
      console.log('El usuario quiere ingresar con correo: ' + user);
    }
    try {
        // verificando correo 
        pool.query(query, [user], function(err,result){
            if (err) throw err;
            if (result.length > 0) {
                const data = result[0];
                const SavePassword = data.password;
                const RecivedPassword = password;
                //console.log(data)
                if (SavePassword==RecivedPassword) {
                    res.status(200).json({msj:data, error: null});
                } else {
                    res.status(401).json({msj:'Incorrect password', error: true}); 
                }
            }else{
                res.status(404).json({msj:'User not found in database', error: true}); 
            }
        });
    } catch (er) {
        //console.log(er);
        res.status(404).json({msj:'User not found in database', error:er});
    }
});

router.post('/addPokemon', async function(req, res) {
    console.log(req.body)
    const {pokemon_id, name, types, url_photo, id_user}=req.body;
    try {
        await mongoConnection.connect();
        const database = mongoConnection.db("pokedex");
        const pokemon = database.collection("pokemon");
        // create a document to insert
        const doc = {
          title: "Record of a Shriveled Datum",
          content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        const result = await pokemon.insertOne(req.body);
       
        res.status(201).json({msj:`Pokemon was inserted with the _id: ${result.insertedId}`, error: null});
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj:"error", error:er});
    } finally {
        await mongoConnection.close();
    }
});

router.get('/getPokemons/userid/:userId', async function(req, res) {
    const user_id = parseInt(req.params.userId,10);
    console.log(user_id)
    try {
        await mongoConnection.connect();
        const database = mongoConnection.db("pokedex");
        const pokemon = database.collection("pokemon");
      
        const query = { id_user: user_id};
        const cursor = pokemon.find(query, {});
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
            res.status(404).json({msj:"No documents found!", error:true});
        }else{
            let data = [];
            await cursor.forEach(element => data.push(element));
            res.status(200).json({msj:data, error: null});
        }
        // replace console.dir with your callback to access individual elements
        //await cursor.forEach(console.dir);
    } finally {
        await mongoConnection.close();
    }
});

router.get('/mongo', async function(req, res) {
    try {
      await mongoConnection.connect();
      const database = mongoConnection.db("pokedex");
      const collection = database.collection("pokemon");
  
      const cursor = collection.find({}, {});
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
        res.status(500).json({ message: "La base de datos Mongo esta vacia" });
      }else{
          var data = [];
          await cursor.forEach( element => data.push(element) );
          res.status(200).send(data);
      }
    } catch (err) {
      res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
    } finally {
      await mongoConnection.close();
    }
  });

/*
router.post('/addPokemon', function(req, res) {
    console.log(req.body)
    const {pokemon_id, name, types, url_photo, id_user}=req.body;
    try {// INSERCION DE NUEVO POKEMON EN LA BASE DE DATOS
        const sql = "INSERT INTO pokemon (pokemon_id, name, types, url_photo ,id_user) VALUES(?,?,?,?,?);";
        pool.query(sql, [pokemon_id, name, types, url_photo ,id_user], function(err,result){
            if (err) throw err;
            if(result.length != 0){
                id_usuario=result.insertId;
                res.status(201).json({msj:'Pokemon hunted'});
            }
        });
    
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj:"error",error:er});
    }
});

*/

module.exports = router;