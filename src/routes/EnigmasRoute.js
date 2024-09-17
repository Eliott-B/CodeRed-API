import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import authClient from '../middlewares/AuthClient.js';
import isAdmin from '../middlewares/IsAdmin.js';
import { getAllEnigmas, getEnigmaById, createEnigma, updateEnigma, deleteEnigma } from '../controllers/EnigmasController.js';

const enigmaRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Enigmas
 *  description: Gestion des énigmes
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
 * /api/enigmas:
 *  get:
 *   tags: [Enigmas]
 *   summary: Récupère la liste des énigmes
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   responses:
 *    200:
 *     description: Retourne la liste des énigmes
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune énigme trouvé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.get('/', authClient, authUser, getAllEnigmas);

/**
 * @swagger
 * /api/enigmas:id:
 *  get:
 *   tags: [Enigmas]
 *   summary: Récupère une énigme par son ID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *   responses:
 *    200:
 *     description: Retourne l'énigme
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune énigme trouvé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.get('/:id', authClient, authUser, getEnigmaById);

/**
 * @swagger
 * /api/enigmas:
 *  post:
 *   tags: [Enigmas]
 *   summary: Crée une énigme
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
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        points:
 *         type: integer
 *   responses:
 *    201:
 *     description: Enigme créé
 *    401:
 *     description: Non autorisé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.post('/', authClient, authUser, isAdmin, createEnigma);

/**
 * @swagger
 * /api/enigmas:id:
 *  put:
 *   tags: [Enigmas]
 *   summary: Modifie une énigme par son ID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        points:
 *         type: integer
 *   responses:
 *    200:
 *     description: Enigme modifié
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Enigme non retrouvé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.put('/:id', authClient, authUser, updateEnigma);

/**
 * @swagger
 * /api/enigmas:id:
 *  delete:
 *   tags: [Enigmas]
 *   summary: Supprime une énigme par son ID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *   responses:
 *    200:
 *     description: Enigme supprimé
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Enigme non retrouvé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.delete('/:id', authClient, authUser, isAdmin, deleteEnigma);

export default enigmaRouter;
