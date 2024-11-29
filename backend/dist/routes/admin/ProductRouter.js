"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const ProductController_1 = require("../../controllers/Admin/ProductController");
class ProductRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-product", Authnetication_1.default.admin, ProductController_1.default.addProduct);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, ProductController_1.default.list);
    }
    put() { }
}
exports.default = new ProductRouter().router;
