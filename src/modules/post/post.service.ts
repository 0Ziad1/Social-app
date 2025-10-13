import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { PostRepository } from "../../model/post/post.repository";
import { IUser } from "../../utils/common/interface";
import { addReactionProvider } from "../../utils/common/providers/reaction";
import { AuthorityError, NotFoundError } from "../../utils/error";
import { PostFactoryService } from "./factory";
import { CreatePostDTO, UpdatePostDTO } from "./post.dto";

class PostService {
    constructor() { };
    private readonly postFactoryService = new PostFactoryService();
    private readonly postRepository = new PostRepository();
    public createPost = (req: Request, res: Response) => {
        //get data from body
        const createPostDTO: CreatePostDTO = req.body;
        const post = this.postFactoryService.createPost(createPostDTO, req.user as IUser);
        const createdPost = this.postRepository.create(post);
        return res.status(201)
            .json({
                message: "Post created successfully",
                success: true,
                data: { createdPost }
            });
    }
    public addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { reaction } = req.body;
        await addReactionProvider(this.postRepository, id as string, userId as unknown as string, reaction);
        return res.sendStatus(204);
    }
    public getSpecificPost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id },
            {},
            {
                populate: [
                    { path: "userId", select: "fullName firstName lastName" },
                    { path: "reactions.userId", select: "fullName firstName lastName" },
                    { path: "comments", match: { parentIds: null } }
                ]
            }
        );
        if (!post) {
            throw new NotFoundError("Post not found");
        }
        return res.status(201).json({ post })
    }
    public deletePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postExistance = await this.postRepository.exist({ _id: id });
        if (!postExistance) throw new NotFoundError("Post not found");
        if (postExistance.userId.toString() != req.user?._id.toString())
            throw new AuthorityError("You are not the author of this post");
        await this.postRepository.delete({ _id: id });
        return res.status(200).json({ message: "post deleted successfully" });
    }
    public freezePost = async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const post = await this.postRepository.exist({ _id: id });
        if (!post) throw new NotFoundError("Post not found");
        if (post?.userId.toString() != (userId as ObjectId).toString())
            throw new AuthorityError("You are not the owner of this Post to freeze it");
        let reversed;
        if (post.frozen == true) { reversed = false }
        else reversed = true
        await this.postRepository.updated({ _id: id, userId }, { frozen: reversed });
        return res.sendStatus(204);
    }
    public hardDeletePost = async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const post = await this.postRepository.exist({ _id: id });
        if (!post) throw new NotFoundError("Post not found");
        if (post?.userId.toString() != (userId as ObjectId).toString())
            throw new AuthorityError("You are not the owner of this Post to delete it");
        await this.postRepository.delete({ _id: id });
        return res.status(200).json({ Message: "Post deleted successfully" });
    }
    public updatePost = async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const updatePostDTO: UpdatePostDTO = req.body;
        const post = await this.postRepository.exist({ _id: id });
        if (!post) throw new NotFoundError("Post not found");
        if (post?.userId.toString() != (userId as ObjectId).toString())
            throw new AuthorityError("You are not the owner of this Post to update it");
        await this.postRepository.updated({ _id: id }, { content: updatePostDTO.content });
        res.sendStatus(204);
    }
}
export default new PostService;