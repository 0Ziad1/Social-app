import { Request, Response } from "express";
import { CommentFactoryService } from "./factory";
declare class CommentService {
    private readonly postRepository;
    private readonly commentRepository;
    commentFactoryService: CommentFactoryService;
    createComment: (req: Request, res: Response) => Promise<void>;
    getCommentWithReply: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addReaction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    freezeComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    hardDeleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateComment: (req: Request, res: Response) => Promise<void>;
    getCommentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CommentService;
export default _default;
//# sourceMappingURL=comment.service.d.ts.map