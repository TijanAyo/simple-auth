import express from "express";
import PostController from "../controllers/post.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const postController = new PostController();
const authMiddleware = new AuthMiddleware();

const router = express.Router();

router.get('/', postController.listAllPost);
router.get('/lookup/:postId', postController.getPost);

router.post('/new', authMiddleware.authorize, postController.createPost);
router.patch('/update/:postId', authMiddleware.authorize, postController.updatePost);
router.delete('/remove/:postId', authMiddleware.authorize, postController.deletePost);

export default router;