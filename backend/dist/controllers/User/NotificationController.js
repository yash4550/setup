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
exports.NotificationController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const index_1 = require("../../locale/index");
const UserNotification_1 = require("../../models/UserNotification");
const mongoose = require("mongoose");
const startTime = new Date().getTime();
class NotificationController {
    /**
     * @api {get} /api/app/notification/get-list?limit=1&page=2 Notification List
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName Notification List
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"statusText":"SUCCESS","message":"NotificationList","data":{"docs":[{"_id":"661a47060645269aaae044f2","type":"Admin","image":null,"allUser":false,"is_read":false,"user":"661a2f234446a74948fe55c0","title":"Hello","message":"Hello","created_at":"2024-04-13T08:49:10.822Z","updated_at":"2024-04-13T08:49:10.822Z","__v":0}],"totalDocs":1,"limit":10,"page":1,"totalPages":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null},"exeTime":182237}
  
     */
    static notificationList(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userLanguage = (_a = req.user.appLanguage) !== null && _a !== void 0 ? _a : "en";
            const strings = (0, index_1.getLanguageStrings)(userLanguage);
            const id = req.user.id;
            try {
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                };
                let query = [
                    {
                        $match: {
                            user: new mongoose.Types.ObjectId(id),
                        },
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = UserNotification_1.default.aggregate(query);
                const list = yield UserNotification_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", strings["NotificationList"], list, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {put} /api/app/notification/read-notification?notificationId=6576f6076af77b38a16a77eb Read Notification
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName read-notification
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"message":"Read Notification","data":{}}
     */
    static readNotification(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userLanguage = (_a = req.user.appLanguage) !== null && _a !== void 0 ? _a : "en";
            const strings = (0, index_1.getLanguageStrings)(userLanguage);
            const notificationId = req.query.notificationId;
            const id = req.user.id;
            try {
                if (notificationId) {
                    yield UserNotification_1.default.findOneAndUpdate({ _id: notificationId }, { is_read: true });
                }
                else {
                    yield UserNotification_1.default.updateMany({ user: id }, { $set: { is_read: true } }, { multi: true });
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", strings["ReadNotification"], {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {delete} /api/app/notification/delete-notification?notificationId=63731fbae74f02ba9ba64ad6 Delete Notification
     * @apiVersion 1.0.0
     * @apiHeader {string} Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................
     * @apiName delete-notification
     * @apiGroup Notification API
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"message":"Delete Notification","data":{}}
     */
    static deleteNotification(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userLanguage = (_a = req.user.appLanguage) !== null && _a !== void 0 ? _a : "en";
            const strings = (0, index_1.getLanguageStrings)(userLanguage);
            const id = req.user.id;
            const notificationId = req.query.notificationId;
            try {
                if (notificationId) {
                    yield UserNotification_1.default.findOneAndDelete({ _id: notificationId });
                }
                else {
                    yield UserNotification_1.default.deleteMany({ user: id });
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", strings["DeleteNotification"], {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.NotificationController = NotificationController;
