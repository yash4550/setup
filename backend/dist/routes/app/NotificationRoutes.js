"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const NotificationController_1 = require("../../controllers/User/NotificationController");
class NotificationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
        this.delete();
    }
    post() { }
    get() {
        this.router.get("/get-list", Authnetication_1.default.user, NotificationController_1.NotificationController.notificationList);
    }
    put() {
        this.router.put("/read-notification", Authnetication_1.default.user, NotificationController_1.NotificationController.readNotification);
    }
    delete() {
        this.router.delete("/delete-notification", Authnetication_1.default.user, NotificationController_1.NotificationController.deleteNotification);
    }
}
exports.default = new NotificationRoutes().router;
