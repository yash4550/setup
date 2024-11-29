"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const PriceMatrixController_1 = require("../../controllers/Admin/PriceMatrixController");
const LoyalityPointController_1 = require("../../controllers/Admin/LoyalityPointController");
class PriceMatrixRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add", Authnetication_1.default.admin, PriceMatrixController_1.PriceMatrixController.add);
        this.router.post("/edit-loyality-point", Authnetication_1.default.admin, LoyalityPointController_1.LoyalityPointController.edit);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, PriceMatrixController_1.PriceMatrixController.list);
        this.router.get("/loyality-point", Authnetication_1.default.admin, LoyalityPointController_1.LoyalityPointController.getLoyalityData);
    }
    put() {
        this.router.put("/edit/:id", Authnetication_1.default.admin, PriceMatrixController_1.PriceMatrixController.edit);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, PriceMatrixController_1.PriceMatrixController.statusChange);
    }
}
exports.default = new PriceMatrixRouter().router;
