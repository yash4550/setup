"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubAdminController_1 = require("../../controllers/Admin/SubAdminController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class SubAdminRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-sub-admin", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.addUser);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.list);
        this.router.get("/get-list/:type", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.getList);
    }
    put() {
        this.router.put("/edit-add-sub-admin/:id", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.editUser);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.statusChange);
        this.router.put("/delete-account/:id", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.deleteUser);
        this.router.put("/view-add-sub-admin/:id", Authnetication_1.default.admin, SubAdminController_1.SubAdminController.viewUser);
    }
}
exports.default = new SubAdminRouter().router;
