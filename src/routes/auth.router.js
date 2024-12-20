const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const authValidation = require("../validations/auth.validation");

const authRouter = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Allows users to log in using either their email or username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 description: The email or username of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *                 example: john123
 *     responses:
 *       200:
 *         description: User logged in successfully, returns the user details and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                       example: 1
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: johndoe@example.com
 *       400:
 *         description: Invalid input or incorrect credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  "/login",
  validationMiddleware(authValidation.login),
  authController.login
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: The user must enter their username, email, and password, but may not enter their phone number. username-required, email-required, password-required, phone-optional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The email address for the new user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: john123
 *               phone:
 *                 type: string
 *                 description: The phone number for the new user (optional).
 *                 example: +11234567890
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                       example: 1
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: johndoe@example.com
 *                     phone:
 *                       type: string
 *                       description: The phone number of the user.
 *                       example: +11234567890
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Internal server error
 */
authRouter.post(
    "/register",
    validationMiddleware(authValidation.register),
    authController.register
  );

module.exports = authRouter;
