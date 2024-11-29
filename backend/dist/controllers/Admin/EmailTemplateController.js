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
const EmailTemplate_1 = require("../../models/EmailTemplate");
class EmailTemplateController {
    static editEmailTemplate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, subject, description } = req.body;
            const id = req.params.id;
            try {
                let emailTemplates = yield EmailTemplate_1.default.findOne({
                    _id: id,
                });
                emailTemplates.name = name ? name : emailTemplates.name;
                emailTemplates.subject = subject ? subject : emailTemplates.subject;
                emailTemplates.body = description ? description : emailTemplates.body;
                emailTemplates.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update email templates successfully", emailTemplates, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static emailTemplateList(req, res, next) {
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
                        {
                            subject: {
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
                if (req.query.status && req.query.status.trim()) {
                    var arrayValues = req.query.status.split(",");
                    var booleanValues = arrayValues.map(function (value) {
                        return value.toLowerCase() === "true";
                    });
                    filteredQuery.is_status = { $in: booleanValues };
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
                var myAggregate = EmailTemplate_1.default.aggregate(query);
                const list = yield EmailTemplate_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static statusChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let emailTemplates = yield EmailTemplate_1.default.findOne({ _id: req.params.id });
                if (!emailTemplates) {
                    let msg = res.__("Email templates not found.");
                    return ResponseHelper_1.default.notFound(res, "notFound", msg, emailTemplates, new Date().getTime());
                }
                emailTemplates.is_status = !emailTemplates.is_status;
                emailTemplates.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "update Successfully", emailTemplates, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static viewEmailTemplate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let emailTemplates = yield EmailTemplate_1.default.findOne({ _id: req.params.id });
                if (!emailTemplates) {
                    let msg = res.__("Email templates not found.");
                    return ResponseHelper_1.default.notFound(res, "notFound", msg, emailTemplates, new Date().getTime());
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "get", emailTemplates, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = EmailTemplateController;
