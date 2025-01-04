const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const categoryValidation = require("../validations/category.validation");
const categoryController = require("../controllers/category.controller");

const categoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *               slug:
 *                 type: string
 *                 description: The slug for the category (optional)
 *                 example: electronics
 *               order:
 *                 type: number
 *                 description: The order of the category (optional)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     slug:
 *                       type: string
 *                       example: electronics
 *                     order:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       403:
 *         description: Forbidden - Only admins can create categories
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
categoryRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(categoryValidation.createCategory),
  categoryController.addCategory
);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the category
 *                     example: "64fda8df6c1b3e21a2f80c6e"
 *                   name:
 *                     type: string
 *                     description: The name of the category
 *                     example: "Electronics"
 *                   slug:
 *                     type: string
 *                     description: The slug of the category
 *                     example: "electronics"
 *                   order:
 *                     type: number
 *                     description: The display order of the category
 *                     example: 1
 *       500:
 *         description: Internal server error
 */
categoryRouter.get("/", categoryController.allCategories);

/**
 * @swagger
 * /api/category/{id}:
 *   post:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the category
 *                 example: "Updated Electronics"
 *               slug:
 *                 type: string
 *                 description: The updated slug for the category
 *                 example: "updated-electronics"
 *               order:
 *                 type: number
 *                 description: The updated display order of the category
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 updatedCategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64fda8df6c1b3e21a2f80c6e"
 *                     name:
 *                       type: string
 *                       example: "Updated Electronics"
 *                     slug:
 *                       type: string
 *                       example: "updated-electronics"
 *                     order:
 *                       type: number
 *                       example: 2
 *       400:
 *         description: Bad request (e.g., validation error)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.post(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(categoryValidation.updateCategory),
  categoryController.updateCategory
);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: This endpoint allows an admin to delete a category by its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       403:
 *         description: Forbidden - User is not authorized to perform this action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You do not have permission to perform this action"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
categoryRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
