import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface";
declare class AdminAuthValidation {
    static loginValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static signUpValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static profileValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
export default AdminAuthValidation;
