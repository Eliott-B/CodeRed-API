import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Database from './modules/database.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import GroupModel from './models/GroupModel.js';
import EnigmaModel from './models/EnigmaModel.js';
import SolutionModel from './models/SolutionModel.js';

import groupsRouter from './routes/GroupsRoute.js';
import enigmasRouter from './routes/EnigmasRoute.js';
import solutionsRouter from './routes/SolutionsRoute.js';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new Database();

const groupModel = GroupModel(db.db);
const enigmaModel = EnigmaModel(db.db);
const solutionModel = SolutionModel(db.db);

await db.connect();
await db.sync();

app.use('/api/groups', groupsRouter);
app.use('/api/enigmas', enigmasRouter);
app.use('/api/solutions', solutionsRouter);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: process.env.npm_package_name,
      version: process.env.npm_package_version,
      description:
        "CodeRed API with Swagger",
      contact: {
        name: "Eliott B",
        url: "https://me.eliott-b.fr",
        email: "eliottb.info@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { db, groupModel, enigmaModel, solutionModel };
