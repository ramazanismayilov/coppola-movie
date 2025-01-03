const { Router } = require("express");
const userController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const userValidation = require("../validations/user.validation");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = Router();

userRouter.get("/forget_password", (req, res, next) => {
  res.render("forget-password", { layout: false });
});

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

/**
 * @swagger
 * /api/users/forget_password:
 *   post:
 *     summary: Create a forget password token
 *     description: Sends a token to the user's email for password reset.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user requesting password reset.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: A token is successfully created and sent to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset token has been sent."
 *       400:
 *         description: Invalid email or input data.
 *       404:
 *         description: User with the provided email not found.
 */
userRouter.post(
  "/forget_password",
  validationMiddleware(userValidation.forgetPassword),
  userController.forgetPassword
);

userRouter.post(
  "/forget_password/confirm",
  validationMiddleware(userValidation.confirmPassword),
  userController.confirmPassword
);

module.exports = userRouter;
