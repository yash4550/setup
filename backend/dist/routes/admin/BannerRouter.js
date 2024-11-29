"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const BannerController_1 = require("../../controllers/Admin/BannerController");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-banner", Authnetication_1.default.admin, BannerController_1.BannerController.addBanner);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, BannerController_1.BannerController.list);
    }
    put() {
        this.router.put("/edit-banner/:id", Authnetication_1.default.admin, BannerController_1.BannerController.editBanner);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, BannerController_1.BannerController.statusChange);
    }
}
exports.default = new BannerRouter().router;
