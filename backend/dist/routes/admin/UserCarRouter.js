"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const UserCarController_1 = require("../../controllers/Admin/UserCarController");
class UserCarRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, UserCarController_1.UserCarController.list);
    }
    put() {
        this.router.put("/status-change/:id", Authnetication_1.default.admin, UserCarController_1.UserCarController.statusChange);
        this.router.put("/approve-car/:id", Authnetication_1.default.admin, UserCarController_1.UserCarController.approveRejectCar);
        this.router.put("/view-car/:id", Authnetication_1.default.admin, UserCarController_1.UserCarController.viewCar);
    }
}
exports.default = new UserCarRouter().router;
