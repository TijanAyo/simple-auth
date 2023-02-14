import PostService from "../services/post.service";
import { Request, Response } from "express";

const postService = new PostService();
class PostController {
    // Accessible by everyone
    public async getAllPost(req: Request, res: Response) {
        const response = await postService.getAllPost();
        return res.json(response);
    }

    // Only accessible to logged in users
    public async createPost(req: Request, res: Response) {
        const response = await postService.createPost();
        return res.json(response);
    }

    // Only accessible to logged in users
    public async updatePost(req: Request, res: Response) {
        const response = await postService.updatePost();
        return res.json(response);   
    }

    // Only accessible to logged in users
    public async deletePost(req: Request, res: Response) {
        const response = await postService.deletePost();
        return res.json(response);
    }
}

export default PostController;