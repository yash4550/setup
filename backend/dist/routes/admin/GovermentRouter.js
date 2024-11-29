"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GovermentController_1 = require("../../controllers/Admin/GovermentController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class GovermentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, GovermentController_1.GovermentController.addData);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, GovermentController_1.GovermentController.list);
        this.router.get("/get-list/:type", Authnetication_1.default.admin, GovermentController_1.GovermentController.getList);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, GovermentController_1.GovermentController.editData);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, GovermentController_1.GovermentController.statusChange);
        this.router.put("/delete-account/:id", Authnetication_1.default.admin, GovermentController_1.GovermentController.deleteUser);
        this.router.put("/view-user/:id", Authnetication_1.default.admin, GovermentController_1.GovermentController.viewUser);
    }
}
exports.default = new GovermentRouter().router;
