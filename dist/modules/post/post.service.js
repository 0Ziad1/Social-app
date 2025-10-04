"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../model/post/post.repository");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
const reaction_1 = require("../../utils/common/providers/reaction");
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
        await (0, reaction_1.addReactionProvider)(this.postRepository, id, userId, reaction);
        return res.sendStatus(204);
    };
    getSpecificPost = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentIds: null } }
            ]
        });
        if (!post) {
            throw new error_1.NotFoundError("Post not found");
        }
        return res.status(201).json({ post });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExistance = await this.postRepository.exist({ _id: id });
        if (!postExistance)
            throw new error_1.NotFoundError("Post not found");
        if (postExistance.userId.toString() != req.user?._id.toString())
            throw new error_1.AuthorityError("You are not the author of this post");
        await this.postRepository.delete({ _id: id });
        return res.status(200).json({ message: "post deleted successfully" });
    };
}
exports.default = new PostService;
//# sourceMappingURL=post.service.js.map