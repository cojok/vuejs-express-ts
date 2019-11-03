import bodyParser from "body-parser";
import express from "express";
import { Routes } from "./routes/routes";

class App {
    public app: express.Application;
    public router: Routes = new Routes();
    constructor() {
        this.app = express();
        this.app.use((req, res, next) => {
            // tslint:disable-next-line: max-line-length
            res.header("Access-Control-Allow-Origin", "http://localhost:8080");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
        this.config();
        this.router.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private getCarList(): void {

    }
}

export default new App().app;
