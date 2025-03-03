const { Router } = require("express");
const userController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const userValidation = require("../validations/user.validation");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = Router();

/**
 * @swagger
 * /api/users:
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
 * /api/users/profile:
 *   post:
 *     summary: Update user profile
 *     description: Updates the user profile with the provided data.
 *     tags:
 *       - "Users"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "The user's username"
 *               email:
 *                 type: string
 *                 description: "The user's email address"
 *               phone:
 *                 type: string
 *                 description: "The user's phone number (optional)"
 *               avatar:
 *                 type: string
 *                 description: "The image ID (optional, to add an avatar)"
 *               location:
 *                 type: string
 *                 description: "The user's location (optional)"
 *               gender:
 *                 type: string
 *                 enum:
 *                   - male
 *                   - female
 *                 description: "The user's gender (optional)"
 *             required:
 *               - username
 *               - email
 *     responses:
 *       200:
 *         description: "User profile updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 location:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Invalid user data provided"
 *       401:
 *         description: "User authentication required"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Server error"
 */
userRouter.post(
  "/profile",
  authMiddleware,
  validationMiddleware(userValidation.updateProfile),
  userController.updateProfile
);

/**
 * @swagger
 * /api/users/reset_password:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password.
 *                 example: currentP@ssw0rd
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: newP@ssw0rd123
 *               repeatPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *                 example: newP@ssw0rd123
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Validation error or mismatched passwords.
 *       401:
 *         description: Unauthorized or invalid token.
 */
userRouter.post(
  "/reset_password",
  authMiddleware,
  validationMiddleware(userValidation.resetPassword),
  userController.resetPassword
);

module.exports = userRouter;
