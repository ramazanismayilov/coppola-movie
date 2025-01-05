const { Router } = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const uploadRouter = require("./upload.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const reviewRouter = require("./review.router");
const forgetPasswordRouter = require("./forgetPassword.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/forgetPassword", forgetPasswordRouter);
router.use("/upload", uploadRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
