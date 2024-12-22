const { Router } = require("express");
const userController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const userValidation = require("../validations/user.validation");

const userRouter = Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get a list of users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully fetched the user list.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: The username of the user.
 *                   email:
 *                     type: string
 *                     description: The email of the user.
 *                   phone:
 *                     type: string
 *                     description: The phone number of the user.
 */
userRouter.get("/", userController.list);

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: mySecureP@ssw0rd
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Validation error.
 */
userRouter.post(
  "/",
  validationMiddleware(userValidation.create),
  userController.create
);

module.exports = userRouter;
