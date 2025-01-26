const { Router } = require("express");
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const blogValidation = require("../validations/blog.validation");

const blogRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   content:
 *                     type: string
 *                   slug:
 *                     type: string
 */
blogRouter.get("/", blogController.allBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: A single blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 image:
 *                   type: string
 *                 category:
 *                   type: string
 *                 content:
 *                   type: string
 *                 slug:
 *                   type: string
 */
blogRouter.get("/:id", blogController.singleBlog);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
blogRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  // validationMiddleware(blogValidation.createBlog),
  blogController.addBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   post:
 *     summary: Update an existing blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
blogRouter.post(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(blogValidation.updateBlog),
  blogController.updateBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
blogRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  blogController.deleteBlog
);

module.exports = blogRouter;
