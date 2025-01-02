const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const forgetPasswordRouter = require("./forgetPassword.router");

const router = Router();

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/forget_password", forgetPasswordRouter)

module.exports = router;
