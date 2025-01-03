const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const uploadRouter = require("./upload.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/upload", uploadRouter);

module.exports = router;
