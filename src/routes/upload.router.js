const { Router } = require("express");
const uploadController = require("../controllers/upload.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

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
  upload.array("images", 10), 
  uploadController.uploadImages
);

module.exports = uploadRouter;
