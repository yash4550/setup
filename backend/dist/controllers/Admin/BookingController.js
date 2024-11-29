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
exports.BookingController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Booking_1 = require("../../models/Booking");
const ObjectId = require("mongodb").ObjectId;
class BookingController {
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
                    console.log(req.query.search, "req.query.search");
                    // filteredQuery = {
                    //   name: {
                    //     $regex: req.query.search,
                    //     $options: "$i",
                    //   },
                    // };
                    filteredQuery.$or = [
                        {
                            sessionId: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.email": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.created_at = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.created_at = { $lte: new Date(req.query.end_date) };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.type && req.query.type !== "null") {
                    filteredQuery.sessionType = req.query.type;
                }
                if (req.query.expathy && req.query.expathy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.expathy
                        .split(",")
                        .map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "customer._id": { $in: serviceIds } }];
                }
                if (req.query.psy && req.query.psy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.psy.split(",").map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "psychologist._id": { $in: serviceIds } }];
                }
                let query = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer",
                        },
                    },
                    {
                        $unwind: {
                            path: "$customer",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "psychologist",
                            foreignField: "_id",
                            as: "psychologist",
                        },
                    },
                    {
                        $unwind: {
                            path: "$psychologist",
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
                var myAggregate = Booking_1.default.aggregate(query);
                const list = yield Booking_1.default.aggregatePaginate(myAggregate, options);
                // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static exportList(req, res, next) {
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
                    console.log(req.query.search, "req.query.search");
                    // filteredQuery = {
                    //   name: {
                    //     $regex: req.query.search,
                    //     $options: "$i",
                    //   },
                    // };
                    filteredQuery.$or = [
                        {
                            sessionId: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.email": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.created_at = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.created_at = { $lte: new Date(req.query.end_date) };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.type && req.query.type !== "null") {
                    filteredQuery.sessionType = req.query.type;
                }
                if (req.query.expathy && req.query.expathy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.expathy
                        .split(",")
                        .map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "customer._id": { $in: serviceIds } }];
                }
                if (req.query.psy && req.query.psy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.psy.split(",").map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "psychologist._id": { $in: serviceIds } }];
                }
                let query = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer",
                        },
                    },
                    {
                        $unwind: {
                            path: "$customer",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "psychologist",
                            foreignField: "_id",
                            as: "psychologist",
                        },
                    },
                    {
                        $unwind: {
                            path: "$psychologist",
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
                var list = yield Booking_1.default.aggregate(query);
                // const list = await Booking.aggregatePaginate(myAggregate, options);
                // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", list, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static cancellationManagement(req, res, next) {
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
                    console.log(req.query.search, "req.query.search");
                    // filteredQuery = {
                    //   name: {
                    //     $regex: req.query.search,
                    //     $options: "$i",
                    //   },
                    // };
                    filteredQuery.$or = [
                        {
                            sessionId: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "customer.email": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "psychologist.phoneNumber": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.created_at = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.created_at = { $lte: new Date(req.query.end_date) };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.created_at = {
                        $gte: new Date(req.query.start_date + "T00:00:00Z"),
                        $lte: new Date(req.query.end_date + "T23:59:59Z"),
                    };
                }
                if (req.query.type && req.query.type !== "null") {
                    filteredQuery.sessionType = req.query.type;
                }
                if (req.query.expathy && req.query.expathy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.expathy
                        .split(",")
                        .map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "customer._id": { $in: serviceIds } }];
                }
                if (req.query.psy && req.query.psy.length > 0) {
                    // console.log(req.query.psy);
                    const serviceIds = req.query.psy.split(",").map((id) => ObjectId(id));
                    // console.log(serviceIds, "serviceIds");
                    filteredQuery.$or = [{ "psychologist._id": { $in: serviceIds } }];
                }
                let query = [
                    {
                        $match: {
                            status: "Cancelled",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customer",
                        },
                    },
                    {
                        $unwind: {
                            path: "$customer",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "psychologist",
                            foreignField: "_id",
                            as: "psychologist",
                        },
                    },
                    {
                        $unwind: {
                            path: "$psychologist",
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
                var myAggregate;
                if (req.query.limit && req.query.page) {
                    const list = Booking_1.default.aggregate(query);
                    myAggregate = yield Booking_1.default.aggregatePaginate(list, options);
                }
                else {
                    myAggregate = yield Booking_1.default.aggregate(query);
                } // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: myAggregate }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.BookingController = BookingController;
