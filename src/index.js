import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Database from './modules/database.js';
import dotenv from 'dotenv';

import GroupModel from './models/GroupModel.js';
import EnigmaModel from './models/EnigmaModel.js';
import SolutionModel from './models/SolutionModel.js';

import groupsRouter from './routes/GroupsRoute.js';
import enigmasRouter from './routes/EnigmasRoute.js';
import solutionsRouter from './routes/SolutionsRoute.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new Database();

const groupModel = GroupModel(db.db);
const enigmaModel = EnigmaModel(db.db);
const solutionModel = SolutionModel(db.db);

await db.connect();
await db.sync();
await db.close();

app.use('/api/groups', groupsRouter);
app.use('/api/enigmas', enigmasRouter);
app.use('/api/solutions', solutionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { db, groupModel, enigmaModel, solutionModel };
