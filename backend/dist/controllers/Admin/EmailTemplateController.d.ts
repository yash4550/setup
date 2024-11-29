declare class EmailTemplateController {
    static editEmailTemplate(req: any, res: any, next: any): Promise<void>;
    static emailTemplateList(req: any, res: any, next: any): Promise<void>;
    static statusChange(req: any, res: any, next: any): Promise<void>;
    static viewEmailTemplate(req: any, res: any, next: any): Promise<void>;
}
export default EmailTemplateController;
