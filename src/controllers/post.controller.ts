import PostService from "../services/post.service";
import { Request, Response } from "express";
import parseUUID from "../helper/custom/parseUUID";


const postService = new PostService();
class PostController {
    // GET: All available article in DB
    public async listAllPost(req: Request, res: Response) {
        const response = await postService.listAllPost();
        return res.json(response);
    }

    // GET: A single article by ID
    public async getPost(req: Request, res: Response) {
        const postId = parseUUID(req.params.postId);
        const response = await postService.getPost(postId);
        return res.json(response);
    }

    // POST: Create an article
    public async createPost(req: Request, res: Response) {
        const userId = req.user.id;
        const response = await postService.createPost(req.body, userId);
        return res.json(response);
    }

    // PATCH: Update an article content by ID
    public async updatePost(req: Request, res: Response) {
        const userId = req.user.id;
        const postId = parseUUID(req.params.postId)
        const response = await postService.updatePost(postId, req.body, userId);
        return res.json(response);   
    }

    // DELETE: Remove an article content by ID
    public async deletePost(req: Request, res: Response) {
        const postId = parseUUID(req.params.postId);
        const userId = req.user.id;
        const response = await postService.deletePost(postId, userId);
        return res.json(response);
    }
}

export default PostController;