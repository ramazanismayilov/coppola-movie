const { Router } = require("express");
const uploadController = require("../controllers/upload.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const uploadRouter = Router();

/**
 * @swagger
 * /api/upload/images:
 *   post:
 *     summary: Upload multiple images and get URLs
 *     tags: [Upload Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded images and returned URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: URL of the uploaded image
 *                 example: "/uploads/123456789-image.jpg"
 *       400:
 *         description: No files uploaded
 *       500:
 *         description: Internal server error
 */
uploadRouter.post(
  "/images", 
  authMiddleware,
  roleMiddleware("admin"),
  upload.array("images", 10), 
  uploadController.addImage
);

/**
 * @swagger
 * /api/upload/images/{id}:
 *   delete:
 *     summary: Delete an image by ID
 *     description: Deletes an image from the server by its ID. Only accessible to admin users.
 *     tags: [Upload Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the image to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - User does not have the required permissions
 *       404:
 *         description: Not Found - Image with the specified ID does not exist
 *       500:
 *         description: Internal server error
 */
uploadRouter.delete(
  "/images/:id", 
  authMiddleware,
  roleMiddleware("admin"),
  uploadController.deleteImage
);

module.exports = uploadRouter;
