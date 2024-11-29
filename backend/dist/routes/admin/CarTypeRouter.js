"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const CarTypeController_1 = require("../../controllers/Admin/CarTypeController");
class CarTypeRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, CarTypeController_1.CarTypeController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CarTypeController_1.CarTypeController.list);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, CarTypeController_1.CarTypeController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, CarTypeController_1.CarTypeController.statusChange);
    }
}
exports.default = new CarTypeRouter().router;
