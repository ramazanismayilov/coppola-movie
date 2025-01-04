const { Router } = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const productValidation = require("../validations/product.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const productController = require("../controllers/product.controller");

const productRouter = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a list of all products with their details, including image and reviews.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the product
 *                     example: "607f1f77bcf86cd7994f56f7"
 *                   title:
 *                     type: string
 *                     description: The title of the product
 *                     example: "T-shirt"
 *                   image:
 *                     type: object
 *                     description: The image object related to the product
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the image
 *                         example: "607f1f77bcf86cd7994f56f8"
 *                       url:
 *                         type: string
 *                         description: The URL of the image
 *                         example: "/uploads/t-shirt.jpg"
 *                   description:
 *                     type: string
 *                     description: A brief description of the product
 *                     example: "Soft and comfortable T-shirt"
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                     example: 25.99
 *                   category:
 *                     type: string
 *                     description: The category ID of the product
 *                     example: "607f1f77bcf86cd7994f56f7"
 *                   slug:
 *                     type: string
 *                     description: The URL-friendly slug for the product
 *                     example: "t-shirt"
 *                   order:
 *                     type: number
 *                     description: The display order of the product
 *                     example: 1
 *                   sku:
 *                     type: string
 *                     description: The stock keeping unit of the product
 *                     example: "TSHIRT-001"
 *                   tag:
 *                     type: string
 *                     description: Tags associated with the product
 *                     example: "fashion, casual"
 *                   review:
 *                     type: array
 *                     description: List of reviews related to the product
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The unique identifier of the review
 *                           example: "607f1f77bcf86cd7994f56f9"
 *                         user:
 *                           type: string
 *                           description: The user ID of the person who wrote the review
 *                           example: "607f1f77bcf86cd7994f56f6"
 *                         comment:
 *                           type: string
 *                           description: The review comment
 *                           example: "Great quality, very comfortable!"
 *                         rating:
 *                           type: number
 *                           description: The rating out of 5 for the product
 *                           example: 5
 *       400:
 *         description: Bad request, invalid parameters
 *       500:
 *         description: Internal server error
 */
productRouter.get("/", productController.allProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Allows admin users to add a new product to the catalog.
 *     tags: [Products]
 *     requestBody:
 *       description: The details of the new product to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product
 *                 example: "T-shirt"
 *               image:
 *                 type: string
 *                 description: The image ID (references the Upload model)
 *                 example: "607f1f77bcf86cd7994f56f8"
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *                 example: "Soft and comfortable T-shirt"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 25.99
 *               category:
 *                 type: string
 *                 description: The category ID the product belongs to
 *                 example: "607f1f77bcf86cd7994f56f7"
 *               slug:
 *                 type: string
 *                 description: The URL-friendly slug for the product
 *                 example: "t-shirt"
 *               order:
 *                 type: number
 *                 description: The order of the product in the list
 *                 example: 1
 *               sku:
 *                 type: string
 *                 description: The product's stock keeping unit
 *                 example: "TSHIRT-001"
 *               tag:
 *                 type: string
 *                 description: Tags associated with the product
 *                 example: "fashion"
 *               review:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Review ID (references the Review model)
 *                   example: "607f1f77bcf86cd7994f56f9"
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized, admin role required
 *       409:
 *         description: Product already exists
 */
productRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(productValidation.addProduct),
  productController.addProduct
);

module.exports = productRouter;
