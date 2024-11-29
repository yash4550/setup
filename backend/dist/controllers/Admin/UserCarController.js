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
exports.UserCarController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const UserCar_1 = require("../../models/UserCar");
const User_1 = require("../../models/User");
const NotificationService_1 = require("../../services/NotificationService");
const express = require("express");
class UserCarController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let sort = [["created_at", -1]];
                if (req.query.sort) {
                    const map = Array.prototype.map;
                    sort = Object.keys(req.query.sort).map((key) => [
                        key,
                        req.query.sort[key],
                    ]);
                    console.log(sort, "sort");
                }
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    collation: {
                        locale: "en",
                    },
                };
                let filteredQuery = {};
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            carNumber: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            carName: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            fuelType: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "user.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "carType.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "carMake.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "carModel.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                    };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.created_at = {
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.status && req.query.status.trim()) {
                    var arrayValues = req.query.status.split(",");
                    var booleanValues = arrayValues.map(function (value) {
                        return value.toLowerCase() === "true";
                    });
                    filteredQuery.is_active = { $in: booleanValues };
                }
                if (req.query.isApprove && req.query.isApprove.trim()) {
                    var arrayValues = req.query.isApprove.split(",");
                    var booleanValues = arrayValues.map(function (value) {
                        return value.toLowerCase() === "true";
                    });
                    filteredQuery.isApprove = { $in: booleanValues };
                }
                let query = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user",
                        },
                    },
                    {
                        $unwind: {
                            path: "$user",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "cartypes",
                            localField: "carType",
                            foreignField: "_id",
                            as: "carType",
                        },
                    },
                    {
                        $unwind: {
                            path: "$carType",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "carmakes",
                            localField: "carMake",
                            foreignField: "_id",
                            as: "carMake",
                        },
                    },
                    {
                        $unwind: {
                            path: "$carMake",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "carmodels",
                            localField: "carModel",
                            foreignField: "_id",
                            as: "carModel",
                        },
                    },
                    {
                        $unwind: {
                            path: "$carModel",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = UserCar_1.default.aggregate(query);
                const list = yield UserCar_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static statusChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const getCar = yield UserCar_1.default.findOne({ _id: req.params.id });
                if (!getCar)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Expact not found", getCar, startTime);
                (getCar.is_active = !getCar.is_active), getCar.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getCar, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                console.log(id, "id");
                let getData = yield UserCar_1.default.findOne({ user: id })
                    .populate([
                    {
                        path: "carModel",
                        select: "name _id",
                    },
                    {
                        path: "carMake",
                        select: "name _id",
                    },
                    {
                        path: "carType",
                        select: "name _id",
                    },
                ])
                    .lean();
                if (!getData) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Data not found", getData, startTime);
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "User details retrieved successfully", getData, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static approveRejectCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const type = req.query.type;
                const getCar = yield UserCar_1.default.findOne({ _id: req.params.id });
                if (!getCar)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not found", getCar, startTime);
                // (getCar.isApprove = true),
                if (type == "is_approved") {
                    getCar.isApprove = true;
                    (getCar.is_active = true), getCar.save();
                    const getDefaultCar = yield UserCar_1.default.findOne({
                        user: getCar.user,
                        isDefault: true,
                    });
                    if (!getDefaultCar) {
                        yield UserCar_1.default.updateMany({ _id: req.params.id }, { $set: { isDefault: true } });
                        yield User_1.default.findOneAndUpdate({ _id: getCar.user }, { $set: { car: req.params.id, isCarAdded: true } });
                    }
                    yield User_1.default.findOneAndUpdate({ _id: getCar.user }, { $set: { car: req.params.id, isCarAdded: true } });
                    yield NotificationService_1.default.sendNotification(getCar.user, "Welcome, your Car has been accepted by the admin");
                }
                else if (type == "is_rejected") {
                    yield UserCar_1.default.findOneAndDelete({ _id: req.params.id });
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Approve Car Successfully", getCar, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserCarController = UserCarController;
