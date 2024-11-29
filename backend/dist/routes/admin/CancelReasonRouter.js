"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CancelReasonController_1 = require("../../controllers/Admin/CancelReasonController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class CancelReasonRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.delete();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, CancelReasonController_1.CancelReasonController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CancelReasonController_1.CancelReasonController.list);
    }
    delete() {
        this.router.delete("/delete/:id", Authnetication_1.default.admin, CancelReasonController_1.CancelReasonController.delete);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, CancelReasonController_1.CancelReasonController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, CancelReasonController_1.CancelReasonController.statusChange);
    }
}
exports.default = new CancelReasonRouter().router;
