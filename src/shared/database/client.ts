import { Pool } from "pg";
import env from "../../environment/env.config";

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    max: 10, //Max de connexion en simulatané
    idleTimeoutMillis: 30000, // déconnexion automatique si inactif
})

pool.on("connect", () =>{
    console.log(`Client is running on PORT ${env.DB_PORT}`);
})

pool.on("error", (err) => {
    console.log("Error Client");
    process.exit(-1);
})

export default pool;