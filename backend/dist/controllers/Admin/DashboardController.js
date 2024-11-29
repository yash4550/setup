"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Rides_1 = require("../../models/Rides");
const User_1 = require("../../models/User");
class DashboardController {
    static dashboardData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUser = yield User_1.default.countDocuments({
                    isVerify: true,
                    is_deleted: false,
                });
                const totalCustomer = yield User_1.default.countDocuments({
                    type: "User",
                    isVerify: true,
                    is_deleted: false,
                });
                const totalDriver = yield User_1.default.countDocuments({
                    type: "Driver",
                    isVerify: true,
                    is_deleted: false,
                });
                const lastTrip = yield Rides_1.default.find()
                    .populate("hotel")
                    .sort({ created_at: -1 })
                    .limit(20);
                const driverRequest = yield User_1.default.find({
                    type: "Driver",
                    isApprove: false,
                    is_active: true,
                    isVerify: true,
                    is_deleted: false,
                })
                    .sort({ created_at: -1 })
                    .limit(5);
                const totalDriverList = yield User_1.default.find({
                    type: "Driver",
                    isVerify: true,
                    is_deleted: false,
                    isOnline: true,
                });
                const data = {
                    totalUser,
                    totalCustomer,
                    totalDriver,
                    lastTrip,
                    driverRequest,
                };
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", data, new Date().getTime());
            }
            catch (error) { }
        });
    }
}
exports.DashboardController = DashboardController;
