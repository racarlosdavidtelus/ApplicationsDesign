const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

let memory = [
  {
    "id":1,
    "name": "cancion1",
    "artist": "artis1",
    "released_during_covid": true,
    "duration": 120
  },
  {
    "id":2,
    "name": "cancion2",
    "artist": "artis2",
    "released_during_covid": true,
    "duration": 140
  },
  {
    "id":3,
    "name": "cancion3",
    "artist": "artis3",
    "released_during_covid": false,
    "duration": 240
  }
]

const server = http.createServer((req, res) => {
  
  if (req.url === '/song' && req.method === 'POST') {
    try {
      let body = "";
      req.on("data", (chunk) => {
          body += chunk.toString();
      });
      req.on("end", () => {
        const songObj = JSON.parse(body);
        memory.push(songObj)
        //console.log(songObj);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Se a agregado la cancion ${songObj.name} con el id ${songObj.id}` }));
      });
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/song\/([0-9]+)/) && req.method === "GET") {
    try {
        const id = req.url.split("/")[2];
        const result = memory.find(_song=> _song.id == parseInt(id,10))
        //console.log(result)
        if (result) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `No existe ninguna cancion con el id ${id}` }));
        }
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url === "/song" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(memory));
  } else if (req.url.match(/\/song\/([0-9]+)/) && req.method === "PUT") {
    try {
      let body = "";
      req.on("data", (chunk) => {
          body += chunk.toString();
      });
      req.on("end", () => {
        const songObj = JSON.parse(body);
        console.log(songObj);
        const id = req.url.split("/")[2];
        const result = memory.find(_song=> _song.id == parseInt(id,10))
        //console.log(result)
        if (result) {
          const index = memory.indexOf(result);
          const newSong = memory[index] = songObj
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newSong));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `No existe ninguna cancion con el id ${id}` }));
        }
        //memory.push(songObj)
        //res.end('{songObj.id}')
      });

      ////
        
        
        
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/song\/([0-9]+)/) && req.method === "DELETE") {
    try {
        const id = req.url.split("/")[2];
        const result = memory.find(_song => _song.id == parseInt(id,10))
        console.log(result)
        if (result) { console.log('voy a borrar')
          memory = memory.filter(_song => _song != result )
          console.log(memory)
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `Se ha eliminado la cancion con el id ${id}` }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `No existe ninguna cancion con el id ${id}` }));
        }
    } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
  } 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});