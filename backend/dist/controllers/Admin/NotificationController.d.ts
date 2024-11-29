declare class NotificationController {
    static notificationList(req: any, res: any, next: any): Promise<void>;
    static addNotification(req: any, res: any, next: any): Promise<void>;
    static viewNotification(req: any, res: any, next: any): Promise<void>;
}
export default NotificationController;
