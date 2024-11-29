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
exports.UserController = void 0;
const User_1 = require("../../models/User");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Auth_1 = require("../../Utils/Auth");
const MailHelper_1 = require("../../helpers/MailHelper");
class UserController {
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
                            type: "User",
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
                // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
            // try {
            //   const startTime = new Date().getTime();
            //   const list = await User.find({ type: "Psychologist" }).sort({
            //     created_at: -1,
            //   });
            //   return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            // } catch (err) {
            //   next(err);
            // }
        });
    }
    static addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { email, mobileNumber, countryCode, name, creditLimit } = req.body;
                const getUser = yield User_1.default.findOne({
                    $or: [
                        {
                            email: email,
                        },
                        { mobileNumber: mobileNumber, countryCode: countryCode },
                    ],
                    type: "User",
                });
                if (getUser)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "User already exist with this Email or Mobile Number ", getUser, startTime);
                const data = {
                    email: email,
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    name: name,
                    type: "User",
                    userName: name,
                    creditLimit: creditLimit,
                    password: yield Auth_1.default.encryptPassword("Test@123"),
                    isApprove: true,
                    isVerify: true,
                };
                const user = yield new User_1.default(data).save();
                yield MailHelper_1.default.sendMailUser(user._id, "Send Credentials", "Test@123");
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add User Successfully", user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { email, mobileNumber, countryCode, name, creditLimit, paymentType, } = req.body;
                const id = req.params.id;
                const getPsychologist = yield User_1.default.findOne({ _id: id });
                console.log(getPsychologist);
                if (!getPsychologist)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not found", getPsychologist, startTime);
                const isCheck = yield User_1.default.findOne({
                    $or: [
                        {
                            email: email,
                        },
                        { mobileNumber: mobileNumber, countryCode: countryCode },
                    ],
                    _id: { $ne: id },
                    type: "User",
                });
                if (isCheck) {
                    return ResponseHelper_1.default.conflict(res, "CONFLICT", "User already exists with this email or phone number", isCheck, startTime);
                }
                // const data = {
                //   email: email,
                //   mobileNumber: mobileNumber,
                //   countryCode: countryCode,
                //   name: name,
                // };
                (getPsychologist.name = name ? name : getPsychologist.name),
                    (getPsychologist.userName = name ? name : getPsychologist.userName),
                    (getPsychologist.mobileNumber = mobileNumber
                        ? mobileNumber
                        : getPsychologist.mobileNumber),
                    (getPsychologist.countryCode = countryCode
                        ? countryCode
                        : getPsychologist.countryCode),
                    (getPsychologist.email = email ? email : getPsychologist.email),
                    (getPsychologist.creditLimit = creditLimit
                        ? creditLimit
                        : getPsychologist.creditLimit),
                    (getPsychologist.paymentType = paymentType
                        ? paymentType
                        : getPsychologist.paymentType),
                    getPsychologist.save();
                // const user = await new User(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getPsychologist, startTime);
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
                const getExpact = yield User_1.default.findOne({ _id: req.params.id });
                if (!getExpact)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Expact not found", getExpact, startTime);
                (getExpact.is_active = !getExpact.is_active), getExpact.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getExpact, startTime);
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
                const getUser = yield User_1.default.findOneAndDelete({ _id: req.params.id });
                // if (!getUser)
                //   return _RS.notFound(
                //     res,
                //     "NOTFOUND",
                //     "Expact not found",
                //     getUser,
                //     startTime
                //   );
                // (getUser.is_deleted = true), getUser.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Delete Account Successfully", {}, startTime);
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
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUser = yield User_1.default.findOne({ _id: req.params.id });
                let password = yield Auth_1.default.encryptPassword(req.body.new_password);
                getUser.password = password;
                getUser.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Change Password successfully", getUser, new Date().getTime());
            }
            catch (error) { }
        });
    }
}
exports.UserController = UserController;