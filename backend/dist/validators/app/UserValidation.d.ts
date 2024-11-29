import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface";
declare class UserValidation {
    static applyDiscount(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static payNow(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static bookingSession(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static rescheduleSession(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static rating(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static report(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
export default UserValidation;
