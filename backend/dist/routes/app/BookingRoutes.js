"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const BookingController_1 = require("../../controllers/User/BookingController");
class BookingRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
        this.delete();
    }
    post() {
        this.router.post("/cancel-ride", Authnetication_1.default.user, BookingController_1.BookingController.cancelRide);
    }
    get() {
        this.router.get("/get-booking-driver/:lat/:long", Authnetication_1.default.user, BookingController_1.BookingController.getBookingDriver);
        this.router.get("/get-booking-list/:status", Authnetication_1.default.user, BookingController_1.BookingController.getBookingList);
        this.router.get("/get-booking-list-customer/:status", Authnetication_1.default.user, BookingController_1.BookingController.getBookingListCustomer);
        this.router.get("/pre-booking-ride-list", Authnetication_1.default.user, BookingController_1.BookingController.preBookingRide);
        this.router.get("/get-booking/:id", Authnetication_1.default.user, BookingController_1.BookingController.getBookingById);
    }
    put() { }
    delete() { }
}
exports.default = new BookingRoutes().router;
