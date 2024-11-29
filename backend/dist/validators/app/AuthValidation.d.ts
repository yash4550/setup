import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface";
declare class AuthValidation {
    static loginValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static signUpValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static socialSignUpValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static resendOtpValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static profileValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static forgetPasswordValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static verifyOTPValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    static resetPasswordValidation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
export default AuthValidation;
