"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controllers/Admin/UserController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-user", Authnetication_1.default.admin, UserController_1.UserController.addUser);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, UserController_1.UserController.list);
        this.router.get("/get-list/:type", Authnetication_1.default.admin, UserController_1.UserController.getList);
    }
    put() {
        this.router.put("/edit-user/:id", Authnetication_1.default.admin, UserController_1.UserController.editUser);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, UserController_1.UserController.statusChange);
        this.router.put("/delete-account/:id", Authnetication_1.default.admin, UserController_1.UserController.deleteUser);
        this.router.put("/reset-password/:id", Authnetication_1.default.admin, UserController_1.UserController.resetPassword);
    }
}
exports.default = new UserRouter().router;
