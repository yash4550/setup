"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubscriptionController_1 = require("../../controllers/Admin/SubscriptionController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class SubscriptionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-subscription", Authnetication_1.default.admin, SubscriptionController_1.SubscriptionController.addSubscription);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, SubscriptionController_1.SubscriptionController.list);
    }
    put() {
        this.router.put("/edit-subscription/:id", Authnetication_1.default.admin, SubscriptionController_1.SubscriptionController.editSubscription);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, SubscriptionController_1.SubscriptionController.statusChange);
        this.router.put("/view-subscription/:id", Authnetication_1.default.admin, SubscriptionController_1.SubscriptionController.viewSubscription);
    }
}
exports.default = new SubscriptionRouter().router;
