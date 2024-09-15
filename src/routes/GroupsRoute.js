import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import authClient from '../middlewares/AuthClient.js';
import isAdmin from '../middlewares/IsAdmin.js';
import { getAllGroups, getGroupById, createGroup, loginGroup, authGroup, updateGroup, deleteGroup } from '../controllers/GroupsController.js';

const groupRouter = express.Router();

groupRouter.get('/', authClient, authUser, getAllGroups);
groupRouter.get('/:id', authClient, authUser, getGroupById);
groupRouter.post('/', authClient, authUser, isAdmin, createGroup);
groupRouter.post('/login', authClient, loginGroup);
groupRouter.post('/auth', authClient, authGroup);
groupRouter.put('/:id', authClient, authUser, updateGroup);
groupRouter.delete('/:id', authClient, authUser, isAdmin, deleteGroup);

export default groupRouter;
