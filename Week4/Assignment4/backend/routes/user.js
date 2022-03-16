var express = require('express');
var router = express.Router();
const pool = require('../databases_connections/mysql_connection');

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
              res.status(201).json({msj:'User Created'});
            }else{
              res.status(409).json({msj:'The email already exists in the database'}); 
            }
          });
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj:"error",error:er});
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
                        res.status(204).json({msj: 'User info updated'});
                    }
                });
              
            }else{
              res.status(409).json({msj: 'The user dont exists in the database'}); 
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
                    res.status(200).json(data);
                } else {
                    res.status(401).json({msj:'Incorrect password'}); 
                }
            }else{
                res.status(404).json({msj:'User not found in database'}); 
            }
        });
    } catch (er) {
        //console.log(er);
        res.status(404).json({msj:'User not found in database',error:er});
    }
});

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
        // verificando correo 
        /*
        pool.query("SELECT * FROM user WHERE email=? ;", [email], function(err,result){
            if (err) throw err;
            if (result.length == 0) {
              console.log("Nuevo Usuario agregado a la BASE DE DATOS")
              res.status(201).json({msj:'User Created'});
            }else{
              res.status(409).json({msj:'The email already exists in the database'}); 
            }
        });
        */
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj:"error",error:er});
    }
});

module.exports = router;