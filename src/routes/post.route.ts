import express from "express";
import PostController from "../controllers/post.controller";

const postController = new PostController();
const router = express.Router();

router.get('/', postController.getAllPost);
router.post('/new', postController.createPost);
router.patch('/update/:postId', postController.updatePost);
router.delete('/remove/:postId', postController.deletePost);

export default router;