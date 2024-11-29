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
exports.HotelController = void 0;
const User_1 = require("../../models/User");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Auth_1 = require("../../Utils/Auth");
const express = require("express");
class HotelController {
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
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            mobileNumber: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            countryCode: {
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
                        $match: {
                            type: "Hotel",
                            isVerify: true,
                            is_deleted: false,
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
                var myAggregate = User_1.default.aggregate(query);
                const list = yield User_1.default.aggregatePaginate(myAggregate, options);
                // const list = await User.find({ type: "Data" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static addHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { email, mobileNumber, hotelName, countryCode, name, creditLimit } = req.body;
                const getHotel = yield User_1.default.findOne({
                    $or: [
                        {
                            email: email,
                        },
                        { mobileNumber: mobileNumber, countryCode: countryCode },
                    ],
                });
                if (getHotel)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "Hotel already exist with this email or mobile number", getHotel, startTime);
                const data = {
                    email: email,
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    name: name,
                    type: "Hotel",
                    userName: name,
                    password: yield Auth_1.default.encryptPassword("Test@123"),
                    isApprove: true,
                    isVerify: true,
                    hotelName: hotelName,
                    creditLimit: creditLimit,
                };
                const user = yield new User_1.default(data).save();
                // await MailHelper.sendMailUser(user._id, "Send Credentials", "123456");
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add User Successfully", user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { email, mobileNumber, countryCode, name, creditLimit, hotelName } = req.body;
                const id = req.params.id;
                const getHotel = yield User_1.default.findOne({ _id: id });
                if (!getHotel)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Hotel not found", getHotel, startTime);
                const isCheck = yield User_1.default.findOne({
                    $or: [
                        {
                            email: email,
                        },
                        { mobileNumber: mobileNumber, countryCode: countryCode },
                    ],
                    _id: { $ne: id },
                });
                if (isCheck) {
                    return ResponseHelper_1.default.conflict(res, "CONFLICT", "Hotel already exists with this email or phone number", isCheck, startTime);
                }
                // const data = {
                //   email: email,
                //   mobileNumber: mobileNumber,
                //   countryCode: countryCode,
                //   name: name,
                // };
                (getHotel.name = name ? name : getHotel.name),
                    (getHotel.userName = name ? name : getHotel.userName),
                    (getHotel.mobileNumber = mobileNumber
                        ? mobileNumber
                        : getHotel.mobileNumber),
                    (getHotel.countryCode = countryCode
                        ? countryCode
                        : getHotel.countryCode),
                    (getHotel.email = email ? email : getHotel.email),
                    (getHotel.creditLimit = creditLimit
                        ? creditLimit
                        : getHotel.creditLimit),
                    (getHotel.hotelName = hotelName ? hotelName : getHotel.hotelName),
                    getHotel.save();
                // const user = await new User(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getHotel, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
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
                const getData = yield User_1.default.findOne({ _id: req.params.id });
                if (!getData)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Data not found", getData, startTime);
                (getData.is_active = !getData.is_active), getData.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getData, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const getData = yield User_1.default.findOne({ _id: req.params.id });
                if (!getData)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Data not found", getData, startTime);
                (getData.is_deleted = true), getData.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getData, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                let getData = yield User_1.default.findOne({ _id: req.params.id });
                if (!getData)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Data not found", getData, startTime);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getData, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filteredQuery = {};
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            mobileNumber: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            countryCode: {
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
                console.log(filteredQuery, "filteredQuery");
                let query = [
                    {
                        $match: {
                            type: req.params.type,
                            isVerify: true,
                            is_deleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "therapists",
                            foreignField: "_id",
                            as: "therapists",
                        },
                    },
                    {
                        $unwind: {
                            path: "$therapists",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "languages",
                            localField: "languageId",
                            foreignField: "_id",
                            as: "languageId",
                        },
                    },
                    {
                        $unwind: {
                            path: "$languageId",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "languages",
                            localField: "psychologistLanguage",
                            foreignField: "_id",
                            as: "psychologistLanguage",
                        },
                    },
                    {
                        $lookup: {
                            from: "psychologisttypes",
                            localField: "psychologistType",
                            foreignField: "_id",
                            as: "psychologistType",
                        },
                    },
                    {
                        $unwind: {
                            path: "$psychologistType",
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
                const getUser = yield User_1.default.aggregate(query);
                // const getUser = await User.find({ type: req.params.type }).populate(
                //   "therapists psychologistLanguage languageId areaOfExperties subscription psychologistType"
                // );
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", getUser, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.HotelController = HotelController;
