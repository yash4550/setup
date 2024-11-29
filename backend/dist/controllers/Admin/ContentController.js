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
exports.ContentController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Content_1 = require("../../models/Content");
class ContentController {
    static list(req, res, next) {
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
                            name: {
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
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                var myAggregate = Content_1.default.aggregate(query);
                const list = yield Content_1.default.aggregatePaginate(myAggregate, options);
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
    static editContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            try {
                let getContent = yield Content_1.default.findOne({ _id: req.params.id });
                if (getContent) {
                    getContent.name = name ? name : getContent.name;
                    getContent.description = description
                        ? description
                        : getContent.description;
                    getContent.save();
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Data Successfully", getContent, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static statusChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getContent = yield Content_1.default.findOne({ _id: req.params.id });
                if (getContent) {
                    getContent.is_status = !getContent.is_status;
                    getContent.save();
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Data Successfully", getContent, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static viewContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getContent = yield Content_1.default.findOne({ _id: req.params.id });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Data", getContent, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ContentController = ContentController;
