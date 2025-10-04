import CommentRepository from "../../../model/comment/comment.repository";
import { PostRepository } from "../../../model/post/post.repository";
import { NotFoundError } from "../../error";
import { REACTION } from "../enum";
import { IReactions } from "../interface";

export const addReactionProvider =async(repo:PostRepository|CommentRepository,id:string,userId:string,reaction:string)=>{
            const existance = await repo.exist({ _id: id }) as { reactions: IReactions[] };
        if (!existance) {
            throw new NotFoundError("Post not found");
        }
        let userReacted = existance.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId?.toString();
        })
        if (userReacted == -1) {
            await repo
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
            await repo.updated({ _id: id },
                { $pull: { reactions: { reaction: existance.reactions[userReacted]?.reaction } } });
        }
        else {
            await repo
                .updated({ _id: id, 'reactions.userId': userId }
                    , { 'reactions.$.reaction': reaction })
        }
}