"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionProvider = void 0;
const error_1 = require("../../error");
const enum_1 = require("../enum");
const addReactionProvider = async (repo, id, userId, reaction) => {
    const existance = await repo.exist({ _id: id });
    if (!existance) {
        throw new error_1.NotFoundError("Post not found");
    }
    let userReacted = existance.reactions.findIndex((reaction) => {
        return reaction.userId.toString() == userId?.toString();
    });
    if (userReacted == -1) {
        await repo
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
        await repo.updated({ _id: id }, { $pull: { reactions: { reaction: existance.reactions[userReacted]?.reaction } } });
    }
    else {
        await repo
            .updated({ _id: id, 'reactions.userId': userId }, { 'reactions.$.reaction': reaction });
    }
};
exports.addReactionProvider = addReactionProvider;
//# sourceMappingURL=reaction.js.map