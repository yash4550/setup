"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const EmailTemplateController_1 = require("../../controllers/Admin/EmailTemplateController");
class EmailTemplateRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, EmailTemplateController_1.default.emailTemplateList);
    }
    put() {
        this.router.put("/edit-email-template/:id", Authnetication_1.default.admin, EmailTemplateController_1.default.editEmailTemplate);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, EmailTemplateController_1.default.statusChange);
        this.router.put("/view/:id", Authnetication_1.default.admin, EmailTemplateController_1.default.viewEmailTemplate);
    }
}
exports.default = new EmailTemplateRouter().router;
