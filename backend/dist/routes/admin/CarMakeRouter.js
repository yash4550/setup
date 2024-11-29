"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const CarMakeController_1 = require("../../controllers/Admin/CarMakeController");
class CarMakeRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, CarMakeController_1.CarMakeController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CarMakeController_1.CarMakeController.list);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, CarMakeController_1.CarMakeController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, CarMakeController_1.CarMakeController.statusChange);
    }
}
exports.default = new CarMakeRouter().router;
