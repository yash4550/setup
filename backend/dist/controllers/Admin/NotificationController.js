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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Notification_1 = require("../../models/Notification");
const User_1 = require("../../models/User");
const NotificationService_1 = require("../../services/NotificationService");
class NotificationController {
    static notificationList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let sort = [["createdAt", -1]];
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
                            title: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            message: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            type: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
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
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = Notification_1.default.aggregate(query);
                const list = yield Notification_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { type, title, message, selectUser, allUser, notificationtype } = req.body;
                const data = {
                    type: type,
                    notificationtype: notificationtype,
                    title: title,
                    message: message,
                    user: selectUser,
                    allUser,
                };
                const user = yield new Notification_1.default(data).save();
                const getAllUSer = yield User_1.default.find({
                    is_deleted: false,
                    is_active: true,
                });
                selectUser && selectUser.length > 0
                    ? selectUser.map((data) => __awaiter(this, void 0, void 0, function* () {
                        // UserNotification.create({
                        //   user: data,
                        //   title: title,
                        //   message: message,
                        //   notificationtype: notificationtype,
                        // });
                        yield NotificationService_1.default.sendNotification(data, title);
                    }))
                    : getAllUSer.length > 0 &&
                        getAllUSer.map((user) => __awaiter(this, void 0, void 0, function* () {
                            // UserNotification.create({
                            //   user: user._id,
                            //   title: title,
                            //   message: message,
                            //   notificationtype: notificationtype,
                            // });
                            yield NotificationService_1.default.sendNotification(user._id, title);
                        }));
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Notification Successfully", user);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getNotification = yield Notification_1.default.findOne({
                    _id: req.params.id,
                }).populate("user");
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Data", getNotification, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = NotificationController;
