import { Request, Response } from "express";
import { CommentFactoryService } from "./factory";
declare class CommentService {
    private readonly postRepository;
    private readonly commentRepository;
    commentFactoryService: CommentFactoryService;
    createComment: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CommentService;
export default _default;
//# sourceMappingURL=comment.service.d.ts.map