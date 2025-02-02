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
 *     description: Retrieves a list of all products with optional filtering by category and pagination.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category ID.
 *         example: "607f1f77bcf86cd7994f56f7"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The page number for pagination (0 for all products).
 *         example: 0
 *       - in: query
 *         name: visibleItemCount
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items per page (0 for all products).
 *         example: 0
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the product
 *                         example: "607f1f77bcf86cd7994f56f7"
 *                       title:
 *                         type: string
 *                         description: The title of the product
 *                         example: "T-shirt"
 *                       image:
 *                         type: object
 *                         description: The image object related to the product
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The unique identifier of the image
 *                             example: "607f1f77bcf86cd7994f56f8"
 *                           url:
 *                             type: string
 *                             description: The URL of the image
 *                             example: "/uploads/t-shirt.jpg"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages
 *                       example: 5
 *                     totalProducts:
 *                       type: integer
 *                       description: The total number of products
 *                       example: 50
 *       400:
 *         description: Bad request, invalid parameters
 *       500:
 *         description: Internal server error
 */
productRouter.get("/", productController.allProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Retrieves the details of a single product by its unique identifier.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the product
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: The details of the requested product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the product
 *                   example: "607f1f77bcf86cd7994f56f7"
 *                 title:
 *                   type: string
 *                   description: The title of the product
 *                   example: "T-shirt"
 *                 image:
 *                   type: object
 *                   description: The image object related to the product
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the image
 *                       example: "607f1f77bcf86cd7994f56f8"
 *                     url:
 *                       type: string
 *                       description: The URL of the image
 *                       example: "/uploads/t-shirt.jpg"
 *                 description:
 *                   type: string
 *                   description: A brief description of the product
 *                   example: "Soft and comfortable T-shirt"
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *                   example: 25.99
 *                 category:
 *                   type: string
 *                   description: The category ID of the product
 *                   example: "607f1f77bcf86cd7994f56f7"
 *                 slug:
 *                   type: string
 *                   description: The URL-friendly slug for the product
 *                   example: "t-shirt"
 *                 order:
 *                   type: number
 *                   description: The display order of the product
 *                   example: 1
 *                 sku:
 *                   type: string
 *                   description: The stock keeping unit of the product
 *                   example: "TSHIRT-001"
 *                 tag:
 *                   type: string
 *                   description: Tags associated with the product
 *                   example: "fashion, casual"
 *                 discount:
 *                   type: number
 *                   description: The discount percentage for the product
 *                   example: 10
 *                 isNew:
 *                   type: boolean
 *                   description: Whether the product is new
 *                   example: true
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.get("/:id", productController.singleProduct);

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
 *               discount:
 *                 type: number
 *                 description: The discount percentage applied to the product
 *                 example: 10
 *               discountedPrice:
 *                 type: number
 *                 description: The discount percentage applied to the product
 *                 example: 25.99
 *               isProductNew:
 *                 type: boolean
 *                 description: Whether the product is newly added or not
 *                 example: true
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

/**
 * @swagger
 * /api/products/{id}:
 *   post:
 *     summary: Update a product
 *     description: Updates an existing product by its ID. Only accessible to admins.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *           example: ""
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product
 *                 example: "Updated T-shirt"
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *                 example: "An updated description for the T-shirt"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 29.99
 *               category:
 *                 type: string
 *                 description: The category ID of the product
 *                 example: "678d31d024f16f6e425473b3"
 *               image:
 *                 type: string
 *                 description: The ID of the product's image
 *                 example: "6794e6135edb68d3892f1ce6"
 *               slug:
 *                 type: string
 *                 description: The URL-friendly slug for the product
 *                 example: "updated-t-shirt"
 *               order:
 *                 type: number
 *                 description: The display order of the product
 *                 example: 2
 *               sku:
 *                 type: string
 *                 description: The stock keeping unit of the product
 *                 example: "TSHIRT-002"
 *               tag:
 *                 type: string
 *                 description: Tags associated with the product
 *                 example: "fashion, updated"
 *               discount:
 *                 type: number
 *                 description: Discount percentage for the product
 *                 example: 10
 *               isProductNew:
 *                 type: boolean
 *                 description: Whether the product is new
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Product updated successfully"
 *                 product:
 *                   type: object
 *                   description: The updated product object
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized, admin access required
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.post(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(productValidation.updateProduct),
  productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by its unique ID. Only accessible by admins.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the product to be deleted
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Product deleted successfully"
 *       400:
 *         description: Bad request, invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid ID format"
 *       401:
 *         description: Unauthorized, admin role required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Unauthorized"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error
 */
productRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.deleteProduct
);

module.exports = productRouter;
