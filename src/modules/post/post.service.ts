import { Request, Response } from "express";
import { PostRepository } from "../../model/post/post.repository";
import { REACTION } from "../../utils/common/enum";
import { IUser } from "../../utils/common/interface";
import { NotFoundError } from "../../utils/error";
import { PostFactoryService } from "./factory";
import { CreatePostDTO } from "./post.dto";

class PostService {
    constructor() { };
    private readonly postFactoryService = new PostFactoryService();
    private readonly postRepository = new PostRepository();
    createPost = (req: Request, res: Response) => {
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
    addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { reaction } = req.body;
        const postExistance = await this.postRepository.exist({ _id: id });
        if (!postExistance) {
            throw new NotFoundError("Post not found");
        }
        let userReacted = postExistance.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId?.toString();
        })
        if (userReacted == -1) {
            await this.postRepository
                .updated({ _id: id }
                    , {
                        $push: {
                            reactions: {
                                userId, reaction: ["", null, undefined]
                                    .includes(reaction) ? REACTION.like : reaction
                            }
                        }
                    });
        }
        else if (["", null, undefined].includes(reaction)) {
            await this.postRepository.updated({ _id: id },
                { $pull: { reactions: { reaction: postExistance.reactions[userReacted]?.reaction } } });
        }
        else {
            await this.postRepository
                .updated({ _id: id, 'reactions.userId': userId }
                    , { 'reactions.$.reaction': reaction })
        }
        return res.sendStatus(204);
    }
    getSpecificPost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id },
            {},
            {
                populate: [
                    { path: "userId", select: "fullName firstName lastName" },
                    { path: "reactions.userId", select: "fullName firstName lastName" },
                    { path: "comments", match: { parentIds: [] } }
                ]
            }
        );
        if (!post) {
            throw new NotFoundError("Post not found");
        }
        return res.status(201).json({ post })
    }
}
export default new PostService;