const { Router } = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const forgetPasswordValidation = require("../validations/forget_password.validation");
const forgetPasswordController = require("../controllers/forgetPassword.controller");

const forgetPasswordRouter = Router();

forgetPasswordRouter.get("/", (req, res, next) => {
  res.render("forget-password", { layout: false });
});

/**
 * @swagger
 * tags:
 *   - name: Forget Password
 *     description: Everything related to password reset and token generation
 */

/**
 * @swagger
 * /api/forget_password:
 *   post:
 *     tags: [Forget Password]
 *     summary: Create a forget password token
 *     description: Sends a token to the user's email for password reset.
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
forgetPasswordRouter.post(
  "/",
  validationMiddleware(forgetPasswordValidation.createForgetPasswordToken),
  forgetPasswordController.createForgetPasswordToken
);

forgetPasswordRouter.post(
  "/confirm",
  validationMiddleware(forgetPasswordValidation.confirmPassword),
  forgetPasswordController.confirmPassword
);

module.exports = forgetPasswordRouter;