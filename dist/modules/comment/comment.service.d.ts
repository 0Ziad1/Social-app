import { Request, Response } from "express";
import { CommentFactoryService } from "./factory";
declare class CommentService {
    private readonly postRepository;
    private readonly commentRepository;
    commentFactoryService: CommentFactoryService;
    createComment: (req: Request, res: Response) => Promise<void>;
    getSpecific: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addReaction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CommentService;
export default _default;
//# sourceMappingURL=comment.service.d.ts.map