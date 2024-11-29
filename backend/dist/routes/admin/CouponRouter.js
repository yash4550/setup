"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CouponController_1 = require("../../controllers/Admin/CouponController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class CouponRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-discount-coupon", Authnetication_1.default.admin, CouponController_1.CouponController.addDiscountCoupon);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, CouponController_1.CouponController.list);
    }
    put() {
        this.router.put("/edit-discount-coupon/:id", Authnetication_1.default.admin, CouponController_1.CouponController.editDiscountCoupon);
        this.router.put("/status-change/:id", Authnetication_1.default.admin, CouponController_1.CouponController.statusChange);
        this.router.put("/view-coupon/:id", Authnetication_1.default.admin, CouponController_1.CouponController.view);
    }
}
exports.default = new CouponRouter().router;
