"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const VoucherController_1 = require("../../controllers/Admin/VoucherController");
class VoucherRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, VoucherController_1.VoucherController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, VoucherController_1.VoucherController.list);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, VoucherController_1.VoucherController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, VoucherController_1.VoucherController.statusChange);
    }
}
exports.default = new VoucherRouter().router;
