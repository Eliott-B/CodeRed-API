import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import authClient from '../middlewares/AuthClient.js';
import isAdmin from '../middlewares/IsAdmin.js';
import { getAllGroups, getGroupById, createGroup, loginGroup, authGroup, updateGroup, deleteGroup, addPenalty, getGroupsPoints, getPoints } from '../controllers/GroupsController.js';

const groupRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Groups
 *  description: Gestion des groupes
 */

/**
 * @swagger
 * components:
 *  securitySchemes: 
 *   clientAuth: 
 *    type: apiKey
 *    in: header
 *    name: token
 *   userAuth:
 *    type: apiKey
 *    in: header
 *    name: groupUUID
 *   adminAuth:
 *    type: apiKey
 *    in: header
 *    name: admin
 */

/**
 * @swagger
 * /api/groups:
 *  get:
 *   tags: [Groups]
 *   summary: Récupère la liste des groupes
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   responses:
 *    200:
 *     description: Retourne la liste des groupes
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucun groupe trouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.get('/', authClient, authUser, getAllGroups);

/**
 * @swagger
 * /api/groups/:id:
 *  get:
 *   tags: [Groups]
 *   summary: Récupère un groupe par son UUID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   responses:
 *    200:
 *     description: Retourne le groupe
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucun groupe trouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.get('/:id', authClient, authUser, getGroupById);

/**
 * @swagger
 * /api/groups:
 *  post:
 *   tags: [Groups]
 *   summary: Crée un groupe
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        password:
 *         type: string
 *        admin:
 *         type: boolean
 *   responses:
 *    201:
 *     description: Groupe créé
 *    401:
 *     description: Non autorisé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.post('/', authClient, authUser, isAdmin, createGroup);

/**
 * @swagger
 * /api/groups/login:
 *  post:
 *   tags: [Groups]
 *   sumary: Affectue la connexion d'un utilisateur
 *   security:
 *    - clientAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    200:
 *     description: Groupe connecté
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Groupe non retrouvé
 *    406:
 *     description: Mauvais mot de passe
 *    500:
 *     description: Erreur serveur
 */
groupRouter.post('/login', authClient, loginGroup);


/**
 * @swagger
 * /api/groups/auth:
 *  post:
 *   tags: [Groups]
 *   sumary: Authentifie un groupe
 *   security:
 *    - clientAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        token:
 *         type: string
 *   responses:
 *    200:
 *     description: Groupe connecté
 *    401:
 *     description: Non autorisé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.post('/auth', authClient, authGroup);

/**
 * @swagger
 * /api/groups/:id:
 *  put:
 *   tags: [Groups]
 *   summary: Modifie un groupe par son UUID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        password:
 *         type: string
 *        admin:
 *         type: boolean
 *   responses:
 *    200:
 *     description: Groupe modifié
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Groupe non retrouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.put('/:id', authClient, authUser, updateGroup);

/**
 * @swagger
 * /api/groups/:id:
 *  delete:
 *   tags: [Groups]
 *   summary: Supprime un groupe par son UUID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   responses:
 *    200:
 *     description: Groupe supprimé
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Groupe non retrouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.delete('/:id', authClient, authUser, isAdmin, deleteGroup);

/**
 * @swagger
 * /api/groups/:id:
 *  patch:
 *   tags: [Groups]
 *   summary: Ajoute un malus à un groupe par son UUID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        penalty:
 *         type: integer
 *   responses:
 *    200:
 *     description: Malus ajouté
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Groupe non retrouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.patch('/:id', authClient, authUser, isAdmin, addPenalty);

/**
 * @swagger
 * /api/groups/points:
 *  get:
 *   tags: [Groups]
 *   summary: Récupère les points des groupes
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   responses:
 *    200:
 *     description: Retourne les points des groupes
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucun groupe trouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.get('/points', authClient, authUser, isAdmin, getGroupsPoints);

/**
 * @swagger
 * /api/groups/points/:id:
 *  get:
 *   tags: [Groups]
 *   summary: Récupère les points d'un groupe par son UUID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   responses:
 *    200:
 *     description: Retourne les points du groupe
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucun groupe trouvé
 *    500:
 *     description: Erreur serveur
 */
groupRouter.get('/points/:id', authClient, authUser, getPoints);

export default groupRouter;
