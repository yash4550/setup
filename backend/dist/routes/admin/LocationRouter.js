"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const LocationController_1 = require("../../controllers/Admin/LocationController");
class LocationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-location", Authnetication_1.default.admin, LocationController_1.default.addLocation);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, LocationController_1.default.list);
    }
    put() {
        this.router.put("/edit-location/:id", Authnetication_1.default.admin, LocationController_1.default.editLocation);
    }
}
exports.default = new LocationRouter().router;
