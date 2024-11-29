"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BookingRouter {
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
exports.default = new BookingRouter().router;
