import CommentRepository from "../../../model/comment/comment.repository";
import { PostRepository } from "../../../model/post/post.repository";
export declare const addReactionProvider: (repo: PostRepository | CommentRepository, id: string, userId: string, reaction: string) => Promise<void>;
//# sourceMappingURL=reaction.d.ts.map