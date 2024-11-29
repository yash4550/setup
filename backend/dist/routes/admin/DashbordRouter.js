"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class DashboardRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() { }
    get() { }
    put() { }
}
exports.default = new DashboardRouter().router;
