
class PostService {
    // Accessible by everyone
    public async getAllPost() {
        return 'Render all post in the database';
    }

    // Only accessible to logged in users
    public async createPost() {
        return 'The story i can only create';
    }

    // Only accessible to logged in users
    public async updatePost() {
        return 'The story i can only rewrite';
    }

    // Only accessible to logged in users
    public async deletePost() {
        return 'The story i can only destroy';
    }
}

export default PostService;