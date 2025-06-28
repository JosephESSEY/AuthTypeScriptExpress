import express, { Application, json, urlencoded, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./shared/middleware/error.middleware";
import { loggerMiddleware } from "./shared/middleware/logger.middleware";
import authRoutes from "./features/auth/auth.route";
import morgan from "morgan";


export class App {
    public app: Application;

    constructor(){
        this.app = express();
        this.initializeMiddlewares();
        this.initializeError();
        this.initializerRoutes();
    }

    private initializeMiddlewares(){
        this.app.use(json());
        this.app.use(morgan("dev"));
        this.app.use(urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(loggerMiddleware)
    }

    private initializeError(){
        this.app.use(errorHandler);
    }
    
    private initializerRoutes(){

        this.app.get("/", (req : Request, res : Response) => {
            res.json({ status: "ok" });
        });

        this.app.use('/api/auth', authRoutes);
    }

    public listen(PORT: number){
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
}