"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HotelRidesController_1 = require("../../controllers/Admin/HotelRidesController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class RideRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, HotelRidesController_1.HotelRidesController.add);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, HotelRidesController_1.HotelRidesController.list);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, HotelRidesController_1.HotelRidesController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, HotelRidesController_1.HotelRidesController.statusChange);
    }
}
exports.default = new RideRouter().router;
