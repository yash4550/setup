"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const TransactionController_1 = require("../../controllers/Admin/TransactionController");
class TransactionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, TransactionController_1.TransactionController.list);
        this.router.get("/get-list", Authnetication_1.default.admin, TransactionController_1.TransactionController.getList);
    }
    put() { }
}
exports.default = new TransactionRouter().router;
