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
 *     description: |
 *       All fields are required for login.
 *       - Password requirements:
 *         - The first letter of the password should be uppercase.
 *         - The password must be between 6 and 30 characters long.
 *         - The password must contain at least one number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user, which must be between 6 and 30 characters long, start with an uppercase letter, and contain at least one number.
 *                 example: John123
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
 *                       type: string
 *                       description: The ID of the user.
 *                       example: "677aac91aa39d54de4f87505"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: John
 *                     surname:
 *                       type: string
 *                       description: The surname of the user.
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       description: The role of the user (e.g., 'user', 'admin').
 *                       example: user
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
 *     description: |
 *       All fields are required for registration.
 *       - Password requirements:
 *         - The first letter of the password should be uppercase.
 *         - The password must be between 6 and 30 characters long.
 *         - The password must contain at least one number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The first name of the user. The name must be between 6 and 30 characters long.
 *                 example: John
 *               surname:
 *                 type: string
 *                 description: The last name of the user. The surname must be between 6 and 30 characters long.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: The email address for the new user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: |
 *                   The password for the new user must meet the following criteria:
 *                   - The first letter should be uppercase.
 *                   - The password should be between 6 and 30 characters long.
 *                   - The password must contain at least one number.
 *                 example: John123
 *     responses:
 *       201:
 *         description: User registered successfully.
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
 *                     name:
 *                       type: string
 *                       description: The first name of the user.
 *                       example: John
 *                     surname:
 *                       type: string
 *                       description: The last name of the user.
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: johndoe@example.com
 *       400:
 *         description: Invalid input or user already exists.
 *       500:
 *         description: Internal server error.
 */
authRouter.post(
  "/register",
  validationMiddleware(authValidation.register),
  authController.register
);

module.exports = authRouter;
