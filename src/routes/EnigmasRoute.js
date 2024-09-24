import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import authClient from '../middlewares/AuthClient.js';
import isAdmin from '../middlewares/IsAdmin.js';
import { getAllEnigmas, getEnigmaById, createEnigma, updateEnigma, deleteEnigma, enabledEnigmas, enabledFinalEnigmas } from '../controllers/EnigmasController.js';

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
 *     description: Aucune énigme trouvée
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.get('/', authClient, authUser, getAllEnigmas);

/**
 * @swagger
 * /api/enigmas/:id:
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
 *     description: Aucune énigme trouvée
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
 *        final:
 *         type: boolean
 *   responses:
 *    201:
 *     description: Enigme créée
 *    401:
 *     description: Non autorisé
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.post('/', authClient, authUser, isAdmin, createEnigma);

/**
 * @swagger
 * /api/enigmas/:id:
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
 *        final:
 *         type: boolean
 *        enabled:
 *         type: boolean
 *   responses:
 *    200:
 *     description: Enigme modifiée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Enigme non retrouvée
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.put('/:id', authClient, authUser, isAdmin, updateEnigma);

/**
 * @swagger
 * /api/enigmas/:id:
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
 *     description: Enigme supprimée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Enigme non retrouvée
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.delete('/:id', authClient, authUser, isAdmin, deleteEnigma);

/**
 * @swagger
 * /api/enigmas:
 *  patch:
 *   tags: [Enigmas]
 *   summary: Active les énigmes
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   responses:
 *    200:
 *     description: Les énigmes ont été activées
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune énigme trouvée
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.patch('/', authClient, authUser, isAdmin, enabledEnigmas);

/**
 * @swagger
 * /api/enigmas/final:
 *  patch:
 *   tags: [Enigmas]
 *   summary: Active les énigmes finales
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *   responses:
 *    200:
 *     description: Les énigmes finales ont été activées
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune énigme trouvée
 *    500:
 *     description: Erreur serveur
 */
enigmaRouter.patch('/final', authClient, authUser, isAdmin, enabledFinalEnigmas);

export default enigmaRouter;
