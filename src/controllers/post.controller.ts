import PostService from "../services/post.service";

const postService = new PostService();

class PostController {

    // Accessible by everyone
    public async getAllPost() {
        return postService.getAllPost();
    }

    // Only accessible to logged in users
    public async createPost() {
        return postService.createPost();
    }

    // Only accessible to logged in users
    public async updatePost() {
        return postService.updatePost();    
    }

    // Only accessible to logged in users
    public async deletePost() {
        return postService.deletePost();
    }
}

export default PostController;