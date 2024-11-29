export declare class DriverController {
    static list(req: any, res: any, next: any): Promise<void>;
    static addData(req: any, res: any, next: any): Promise<void>;
    static editData(req: any, res: any, next: any): Promise<void>;
    static statusChange(req: any, res: any, next: any): Promise<void>;
    static deleteUser(req: any, res: any, next: any): Promise<void>;
    static viewDriver(req: any, res: any, next: any): Promise<void>;
    static getList(req: any, res: any, next: any): Promise<void>;
    static approveDriver(req: any, res: any, next: any): Promise<void>;
}