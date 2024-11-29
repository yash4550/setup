"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const ContentController_1 = require("../../controllers/Admin/ContentController");
class ContentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, ContentController_1.ContentController.list);
    }
    put() {
        this.router.put("/edit-content/:id", Authnetication_1.default.admin, ContentController_1.ContentController.editContent);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, ContentController_1.ContentController.statusChange);
        this.router.put("/view-content/:id", Authnetication_1.default.admin, ContentController_1.ContentController.viewContent);
    }
}
exports.default = new ContentRouter().router;
