import { Request, Response } from "express";
declare class PostService {
    constructor();
    private readonly postFactoryService;
    private readonly postRepository;
    createPost: (req: Request, res: Response) => Response<any, Record<string, any>>;
    addReaction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSpecificPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    freezePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    hardDeletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updatePost: (req: Request, res: Response) => Promise<void>;
}
declare const _default: PostService;
export default _default;
//# sourceMappingURL=post.service.d.ts.map