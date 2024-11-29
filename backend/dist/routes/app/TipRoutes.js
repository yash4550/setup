"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const TipController_1 = require("../../controllers/User/TipController");
class TipRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
        this.delete();
    }
    post() {
        this.router.post("/add-tip", Authnetication_1.default.user, TipController_1.TipController.addTip);
    }
    get() {
        this.router.get("/get-tip", Authnetication_1.default.user, TipController_1.TipController.getTip);
        this.router.get("/get-tip-amount", TipController_1.TipController.getTipAmountList);
    }
    put() { }
    delete() { }
}
exports.default = new TipRoutes().router;
