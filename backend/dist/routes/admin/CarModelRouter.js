"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const CarModelController_1 = require("../../controllers/Admin/CarModelController");
class CarModelRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, CarModelController_1.CarModelController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CarModelController_1.CarModelController.list);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, CarModelController_1.CarModelController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, CarModelController_1.CarModelController.statusChange);
    }
}
exports.default = new CarModelRouter().router;
