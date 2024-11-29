export declare class MailHelper {
    constructor();
    static sendMail(userId: any, subject: any): Promise<void>;
    static sendMailUser(userId: any, subject: any, password: any): Promise<void>;
    static sendMailUserForgot(userId: any, subject: any): Promise<void>;
    static sendMailUserOtp(userId: any, subject: any): Promise<void>;
    static sendVerifyMail(userId: any, subject: any): Promise<void>;
    static sendReferalCodeMail(userId: any, data: any): Promise<void>;
    static sendReportMail(data: any): Promise<void>;
    static sendOTPONEMail(otp: any, email: any): Promise<void>;
}
export default MailHelper;
