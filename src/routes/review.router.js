const { Router } = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const reviewValidation = require("../validations/review.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");

const reviewRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 */


/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully retrieved reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64e6f82c734d312b2c8f7b9c"
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64e6f80f734d312b2c8f7b8c"
 *                           username:
 *                             type: string
 *                             example: "johndoe"
 *                       comment:
 *                         type: string
 *                         example: "Great product, highly recommend!"
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-08-23T10:20:30Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-08-23T10:20:30Z"
 *       500:
 *         description: Internal server error
 */
reviewRouter.get("/", reviewController.allReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product being reviewed
 *                 example: "64e6f814734d312b2c8f7b8d"
 *               comment:
 *                 type: string
 *                 description: Review comment
 *                 example: "The product quality is excellent!"
 *               rating:
 *                 type: number
 *                 description: Rating for the product (1-5)
 *                 example: 4
 *     responses:
 *       201:
 *         description: Review successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64e6f82c734d312b2c8f7b9c"
 *                 productId:
 *                   type: string
 *                   example: "64e6f814734d312b2c8f7b8d"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64e6f80f734d312b2c8f7b8c"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                 comment:
 *                   type: string
 *                   example: "The product quality is excellent!"
 *                 rating:
 *                   type: number
 *                   example: 4
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-08-23T10:20:30Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-08-23T10:20:30Z"
 *       400:
 *         description: Bad request, validation failed
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
reviewRouter.post(
  "/",
  authMiddleware,
  validationMiddleware(reviewValidation.addReview),
  reviewController.addReview
);

module.exports = reviewRouter;
