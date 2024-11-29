"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const NotificationController_1 = require("../../controllers/Admin/NotificationController");
class NotificationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-notification", Authnetication_1.default.admin, NotificationController_1.default.addNotification);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, NotificationController_1.default.notificationList);
    }
    put() {
        this.router.put("/view-notification/:id", Authnetication_1.default.admin, NotificationController_1.default.viewNotification);
    }
}
exports.default = new NotificationRouter().router;
