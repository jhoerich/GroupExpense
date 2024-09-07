import express, {Router} from "express";
import { DataSource} from "typeorm";
import { Benutzer } from "./models/benutzer";
import {registerRoutes} from "./routes/routes";
import {Gruppe} from "./models/gruppe";
import {Waehrung} from "./models/waehrung";
import {BenutzerGruppeZuordnung} from "./models/benutzerGruppeZuordnung";
import {Ausgabe} from "./models/ausgabe";
import {AusgabeBenutzerZuordnung} from "./models/ausgabeBenutzerZuordnung";

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "janekhoricht",
    database: "groupexpense",
    synchronize: true,
    entities: [Benutzer,Gruppe, Waehrung, BenutzerGruppeZuordnung, Ausgabe, AusgabeBenutzerZuordnung],
    migrations: [],
    subscribers: []
})

dataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json())

        const port = process.env.PORT || 3000;
        const router = Router()
        registerRoutes(router);

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        });

        app.use("/api/", router);

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
