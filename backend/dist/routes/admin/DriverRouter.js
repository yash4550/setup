"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const DriverController_1 = require("../../controllers/Admin/DriverController");
class DriverRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, DriverController_1.DriverController.addData);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, DriverController_1.DriverController.list);
        this.router.get("/get-list/:type", Authnetication_1.default.admin, DriverController_1.DriverController.getList);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, DriverController_1.DriverController.editData);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, DriverController_1.DriverController.statusChange);
        this.router.put("/delete-account/:id", Authnetication_1.default.admin, DriverController_1.DriverController.deleteUser);
        this.router.put("/view-driver/:id", Authnetication_1.default.admin, DriverController_1.DriverController.viewDriver);
        this.router.put("/approve-driver/:id", Authnetication_1.default.admin, DriverController_1.DriverController.approveDriver);
    }
}
exports.default = new DriverRouter().router;
