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
exports.CancelReasonController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const CancelReason_1 = require("../../models/CancelReason");
class CancelReasonController {
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
                            title: {
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
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = CancelReason_1.default.aggregate(query);
                const list = yield CancelReason_1.default.aggregatePaginate(myAggregate, options);
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
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { title } = req.body;
                const data = {
                    title: title,
                };
                const reason = yield new CancelReason_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Reason Successfully", reason);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const deletedReason = yield CancelReason_1.default.findByIdAndDelete(id);
                if (!deletedReason) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Reason not found", null, startTime);
                }
                return ResponseHelper_1.default.ok(res, "Success", "Reason deleted successfully", deletedReason, startTime);
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
                const getReason = yield CancelReason_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getReason)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Reason not found", getReason, startTime);
                (getReason.is_status = !getReason.is_status), getReason.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getReason, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { title } = req.body;
                const id = req.params.id;
                const getBanner = yield CancelReason_1.default.findOne({ _id: id });
                console.log(getBanner);
                if (!getBanner)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Banner not found", getBanner, startTime);
                (getBanner.title = title ? title : getBanner.title), getBanner.save();
                // const user = await new User(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getBanner, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CancelReasonController = CancelReasonController;
