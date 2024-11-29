"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommonController_1 = require("../controllers/CommonController");
class CommonRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() {
        this.router.get("/country", CommonController_1.CommonController.country);
        this.router.get("/city/:state_id", CommonController_1.CommonController.city);
        this.router.get("/state/:country_id", CommonController_1.CommonController.state);
        this.router.get("/project-list", CommonController_1.CommonController.projectList);
        this.router.get("/location-list", CommonController_1.CommonController.locationList);
        this.router.get("/category-list", CommonController_1.CommonController.categoryList);
        this.router.get("/category-all-list", CommonController_1.CommonController.categoryAll);
        this.router.get("/product-list/:id", CommonController_1.CommonController.productList);
        this.router.get("/product-detail/:id", CommonController_1.CommonController.productDetail);
        this.router.get("/factory-reset", CommonController_1.CommonController.factoryResetData);
    }
    put() { }
}
exports.default = new CommonRouter().router;
