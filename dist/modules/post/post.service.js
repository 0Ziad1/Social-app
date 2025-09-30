"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../model/post/post.repository");
const enum_1 = require("../../utils/common/enum");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
class PostService {
    constructor() { }
    ;
    postFactoryService = new factory_1.PostFactoryService();
    postRepository = new post_repository_1.PostRepository();
    createPost = (req, res) => {
        //get data from body
        const createPostDTO = req.body;
        const post = this.postFactoryService.createPost(createPostDTO, req.user);
        const createdPost = this.postRepository.create(post);
        return res.status(201)
            .json({
            message: "Post created successfully",
            success: true,
            data: { createdPost }
        });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { reaction } = req.body;
        const postExistance = await this.postRepository.exist({ _id: id });
        if (!postExistance) {
            throw new error_1.NotFoundError("Post not found");
        }
        let userReacted = postExistance.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId?.toString();
        });
        if (userReacted == -1) {
            await this.postRepository
                .updated({ _id: id }, {
                $push: {
                    reactions: {
                        userId, reaction: ["", null, undefined]
                            .includes(reaction) ? enum_1.REACTION.like : reaction
                    }
                }
            });
        }
        else if (["", null, undefined].includes(reaction)) {
            await this.postRepository.updated({ _id: id }, { $pull: { reactions: { reaction: postExistance.reactions[userReacted]?.reaction } } });
        }
        else {
            await this.postRepository
                .updated({ _id: id, 'reactions.userId': userId }, { 'reactions.$.reaction': reaction });
        }
        return res.sendStatus(204);
    };
    getSpecificPost = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentIds: [] } }
            ]
        });
        if (!post) {
            throw new error_1.NotFoundError("Post not found");
        }
        return res.status(201).json({ post });
    };
}
exports.default = new PostService;
//# sourceMappingURL=post.service.js.map