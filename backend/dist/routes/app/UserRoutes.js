"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
    }
    post() { }
}
exports.default = new UserRoutes().router;
