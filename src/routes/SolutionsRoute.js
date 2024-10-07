import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import authClient from '../middlewares/AuthClient.js';
import isAdmin from '../middlewares/IsAdmin.js';
import { getSolutionsToAnEnigma, getSolutionsToAnGroup, createSolution, updateSolution, answer, useTip, deleteSolution } from '../controllers/SolutionsController.js';

const solutionRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Solutions
 *  description: Gestion des solutions des énigmes
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
 * /api/solutions?enigmaId={enigmaId}:
 *  get:
 *   tags: [Solutions]
 *   summary: Récupère la liste des solutions d'une énigme
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   filters:
 *    - in: path
 *      name: enigmaId
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *   responses:
 *    200:
 *     description: Retourne la liste des solutions
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune solution trouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.get('/', authClient, authUser, isAdmin, getSolutionsToAnEnigma);

/**
 * @swagger
 * /api/solutions?groupId={groupId}:
 *  get:
 *   tags: [Solutions]
 *   summary: Récupère la liste des solutions d'un groupe
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   filters:
 *    - in: path
 *      name: groupId
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: ID du groupe
 *   responses:
 *    200:
 *     description: Retourne la liste des solutions
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Aucune solution trouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.get('/:id', authClient, authUser, isAdmin, getSolutionsToAnGroup);

/**
 * @swagger
 * /api/solutions:
 *  post:
 *   tags: [Solutions]
 *   summary: Crée une solution
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
 *        enigmaId:
 *         type: integer
 *        groupId:
 *         type: string
 *         format: uuid
 *        solution:
 *         type: string
 *        inputPath:
 *         type: string
 *        consoleOutput:
 *         type: string
 *   responses:
 *    201:
 *     description: Solution créée
 *    401:
 *     description: Non autorisé
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.post('/', authClient, authUser, isAdmin, createSolution);

/**
 * @swagger
 * /api/solutions/:enigmaId/:groupId:
 *  put:
 *   tags: [Solutions]
 *   summary: Modifie une solution par l'ID de l'énigme et l'UUID du groupe
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: enigmaId
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *    - in: path
 *      name: groupId
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
 *        solution:
 *         type: string
 *        inputPath:
 *         type: string
 *        consoleOutput:
 *         type: string
 *   responses:
 *    200:
 *     description: Solution modifiée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Solution non retrouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.put('/:enigmaId/:groupId', authClient, authUser, isAdmin, updateSolution);

/**
 * @swagger
 * /api/solutions/:enigmaId/:groupId:
 *  patch:
 *   tags: [Solutions]
 *   summary: Essaye la réponse d'une solution par l'ID de l'énigme et l'UUID du groupe
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: enigmaId
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *    - in: path
 *      name: groupId
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
 *        answer:
 *         type: string
 *   responses:
 *    200:
 *     description: Solution modifiée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Solution non retrouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.put('/:enigmaId', authClient, authUser, answer);

/**
 * @swagger
 * /api/solutions/:enigmaId/:groupId:
 *  patch:
 *   tags: [Solutions]
 *   summary: Modifie l'utilisation d'un indice d'une solution par l'ID de l'énigme et l'UUID du groupe
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: enigmaId
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *    - in: path
 *      name: groupId
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
 *        tip_used:
 *         type: boolean
 *   responses:
 *    200:
 *     description: Solution modifiée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Solution non retrouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.put('/:enigmaId/:groupId', authClient, authUser, isAdmin, useTip);

/**
 * @swagger
 * /api/solutions/:enigmaId/:groupId:
 *  delete:
 *   tags: [Solutions]
 *   summary: Supprime une solution par son ID
 *   security:
 *    - clientAuth: []
 *    - userAuth: []
 *    - adminAuth: []
 *   parameters:
 *    - in: path
 *      name: enigmaId
 *      schema:
 *       type: integer
 *      required: true
 *      description: ID de l'énigme
 *    - in: path
 *      name: groupId
 *      schema:
 *       type: string
 *       format: uuid
 *      required: true
 *      description: UUID du groupe
 *   responses:
 *    200:
 *     description: Solution supprimée
 *    401:
 *     description: Non autorisé
 *    404:
 *     description: Solution non retrouvée
 *    500:
 *     description: Erreur serveur
 */
solutionRouter.delete('/:enigmaId/:groupId', authClient, authUser, isAdmin, deleteSolution);

export default solutionRouter;
