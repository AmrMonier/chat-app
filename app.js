import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config()
//import routes from './routes';

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
  }

  routes() {
    //this.server.use(routes);
  }

  run() {
    this.server.listen(this.port, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`App Running on http://localhost:${this.port}`);
    });
  }
}

const server = new App(3030);

server.run();
