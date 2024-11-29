"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const OrderController_1 = require("../../controllers/Admin/OrderController");
class OrderRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, OrderController_1.OrderController.list);
        this.router.get("/get-activity/:id", Authnetication_1.default.admin, OrderController_1.OrderController.getActivities);
    }
    put() { }
}
exports.default = new OrderRouter().router;
