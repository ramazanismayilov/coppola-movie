const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
