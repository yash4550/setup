export declare class NotificationController {
    /**
     * @api {get} /api/app/notification/get-list?limit=1&page=2 Notification List
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName Notification List
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"statusText":"SUCCESS","message":"NotificationList","data":{"docs":[{"_id":"661a47060645269aaae044f2","type":"Admin","image":null,"allUser":false,"is_read":false,"user":"661a2f234446a74948fe55c0","title":"Hello","message":"Hello","created_at":"2024-04-13T08:49:10.822Z","updated_at":"2024-04-13T08:49:10.822Z","__v":0}],"totalDocs":1,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null},"exeTime":182237}
  
     */
    static notificationList(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {put} /api/app/notification/read-notification?notificationId=6576f6076af77b38a16a77eb Read Notification
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName read-notification
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"message":"Read Notification","data":{}}
     */
    static readNotification(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {delete} /api/app/notification/delete-notification?notificationId=63731fbae74f02ba9ba64ad6 Delete Notification
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName delete-notification
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"message":"Delete Notification","data":{}}
     */
    static deleteNotification(req: any, res: any, next: any): Promise<void>;
}
