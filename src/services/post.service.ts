import { PrismaClient } from "@prisma/client";
import { PostDto } from "../types";
import { postArticleSchema, updateArticleSchema } from "../validation";

const prisma = new PrismaClient();
class PostService {
    public async listAllPost(): Promise<{nbHits: number, data: object}> {
        const data = await prisma.article.findMany({ select: { id: true, title: true, createdAt: true }});
        return {nbHits: data.length, data};
    }

    public async getPost(postId: string) {
        try {
            const post = await prisma.article.findUnique({ where: { id: postId }});
            if (!post) return { statusCode: 404, message: `Post with ID: ${postId} not found.`}
            return post;
        } catch(err:any) {
            return { statusCode: 500, message: err.message };
        }
    }

    public async createPost(payload: PostDto, userId: string): Promise<object> {
        try {
            await postArticleSchema.validateAsync(payload);
            const newPost = await prisma.article.create({
                data: {
                    title: payload.title,
                    content: payload.content,
                    authorId: userId
                }, select: { id: true, title: true, content: true}
            });
            if (!newPost) return { statusCode: 400, message: "Something went wrong somewhere" };
            return newPost;    
        } catch(err:any) {
            return { statusCode: 500, message: err.message };
        }
    }

    public async updatePost(postId:string, payload: PostDto, userId: string): Promise<object> {
        try {
            const post = await prisma.article.findUnique({ where: { id: postId }});
            if (!post) return { statusCode: 404, message: `Content with ID: ${postId} does not exist`};
            if (post.authorId !== userId) return { statusCode: 401, message: `You are not authorized to make changes to this post` };
            await updateArticleSchema.validateAsync(payload);
            const updateContent = await prisma.article.update({
                where: { id: postId },
                data: {
                    title: payload.title,
                    content: payload.content
                },
                select: { id: true, title: true, content: true }
            });
            if (!updateContent) return { statusCode: 401, message: "Something went wrong... Try again in 2 min"};
            return updateContent;
        } catch(err:any) {
            return { statusCode: 500, message: err.message };
        }
    }

    public async deletePost(postId: string, userId: string): Promise<{ statusCode: number, message: string }> {
        try {
            const post = await prisma.article.findUnique({ where: { id: postId }});
            if (!post) return { statusCode: 404, message: `Content with ID: ${postId} not found`};
            if (post.authorId !== userId) return { statusCode: 401, message: `You are not authorized to make changes to this post` };
            const deleteContent = await prisma.article.delete({ where: { id: postId }});
            if (!deleteContent) return { statusCode: 401, message: "Something went wrong... Try again in 2 min"};
            return { statusCode: 200, message: `${post.title} has been deleted successfully`};
        } catch(err:any) {
            return { statusCode: 500, message: err.message };
        }
    }
}
export default PostService;