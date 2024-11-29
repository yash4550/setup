"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HotelController_1 = require("../../controllers/Admin/HotelController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class HotelRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-hotel", Authnetication_1.default.admin, HotelController_1.HotelController.addHotel);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, HotelController_1.HotelController.list);
        this.router.get("/get-list/:type", Authnetication_1.default.admin, HotelController_1.HotelController.getList);
    }
    put() {
        this.router.put("/edit-hotel/:id", Authnetication_1.default.admin, HotelController_1.HotelController.editHotel);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, HotelController_1.HotelController.statusChange);
        this.router.put("/delete-account/:id", Authnetication_1.default.admin, HotelController_1.HotelController.deleteUser);
        this.router.put("/view-user/:id", Authnetication_1.default.admin, HotelController_1.HotelController.viewUser);
    }
}
exports.default = new HotelRoutes().router;
