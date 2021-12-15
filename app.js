import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path"
import {Server} from "socket.io"
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class App {
  constructor(port) {
    this.server = express();
    this.middlewares();
    this.routes();
    this.port = port || process.env.PORT;
  }

  middlewares() {
    this.server.use(bodyParser.json());
    this.server.use(cors())
    this.server.use(express.static(path.join(__dirname, 'public')))
  }

  routes() {
    //this.server.use(routes);
    this.server.get('/', (req, res, next) => {
        res.redirect('/client')
    })
  }

  run() {
    const server = http.createServer(this.server)
    const io = new Server(server)
    
    io.on('connection', (socket) => {
        socket.emit('message', 'Welcome to the chat Room')
        socket.broadcast.emit('newUser', 'new User has joined the chat  room')
        socket.on('message', (msg) => {
          io.emit('message', msg)
        })
      socket.on("share-location", (location, callback) => {
        io.emit(
          "share-location",
          `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
        );
        callback('location shared');
      });
      socket.on("disconnect", () => {
        io.emit("userDisconnected", "A User Left the chat room");
      });
    });
    server.listen(this.port, () => {
      console.log(`App Running on http://localhost:${server.address().port}`);
    });
  }
}

const app = new App(3030);

app.run();
