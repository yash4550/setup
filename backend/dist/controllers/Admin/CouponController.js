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
exports.CouponController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Coupon_1 = require("../../models/Coupon");
class CouponController {
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
                            promoCode: {
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
                var myAggregate = Coupon_1.default.aggregate(query);
                const list = yield Coupon_1.default.aggregatePaginate(myAggregate, options);
                // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
            // try {
            //   const startTime = new Date().getTime();
            //   const list = await Coupon.find({}).sort({
            //     created_at: -1,
            //   });
            //   return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            // } catch (err) {
            //   next(err);
            // }
        });
    }
    static addDiscountCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { promoCode, endDate, noOfUse, noOfUser, percentage, maxAmount, minAmount, description, title, } = req.body;
                console.log(req.body);
                const getDiscountCoupon = yield Coupon_1.default.findOne({ promoCode: promoCode });
                if (getDiscountCoupon)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "DiscountCoupon already exist with this code", getDiscountCoupon, startTime);
                var type = "";
                const data = {
                    promoCode,
                    endDate,
                    noOfUse,
                    noOfUser,
                    percentage,
                    maxAmount,
                    minAmount,
                    description,
                    type,
                    title,
                };
                const coupon = yield new Coupon_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Discount Coupon Successfully", coupon);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editDiscountCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { promoCode, endDate, noOfUse, noOfUser, percentage, maxAmount, minAmount, description, title, } = req.body;
                const getDiscountCoupon = yield Coupon_1.default.findOne({
                    _id: req.params.id,
                });
                const isCheck = yield Coupon_1.default.findOne({
                    promoCode: promoCode,
                    _id: { $ne: req.params.id },
                });
                if (!getDiscountCoupon)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Discount Coupon not found", getDiscountCoupon, startTime);
                if (isCheck)
                    return ResponseHelper_1.default.conflict(res, "CONFLICT", "This promo code already added", getDiscountCoupon, startTime);
                var type = "";
                (getDiscountCoupon.promoCode = promoCode
                    ? promoCode
                    : getDiscountCoupon.promoCode),
                    (getDiscountCoupon.endDate = endDate
                        ? endDate
                        : getDiscountCoupon.endDate),
                    (getDiscountCoupon.noOfUse = noOfUse
                        ? noOfUse
                        : getDiscountCoupon.noOfUse),
                    (getDiscountCoupon.noOfUser = noOfUser
                        ? noOfUser
                        : getDiscountCoupon.noOfUser),
                    (getDiscountCoupon.percentage = percentage
                        ? percentage
                        : getDiscountCoupon.percentage),
                    (getDiscountCoupon.maxAmount = maxAmount
                        ? maxAmount
                        : getDiscountCoupon.maxAmount),
                    (getDiscountCoupon.minAmount = minAmount
                        ? minAmount
                        : getDiscountCoupon.minAmount),
                    (getDiscountCoupon.description = description
                        ? description
                        : getDiscountCoupon.description),
                    (getDiscountCoupon.title = title ? title : getDiscountCoupon.title),
                    getDiscountCoupon.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Discount Coupon Successfully", getDiscountCoupon, startTime);
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
                const getCoupon = yield Coupon_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getCoupon)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Coupon not found", getCoupon, startTime);
                (getCoupon.is_active = !getCoupon.is_active), getCoupon.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getCoupon, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static view(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const getCoupon = yield Coupon_1.default.findOne({
                    _id: req.params.id,
                }).populate("subscription");
                if (!getCoupon)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Coupon not found", getCoupon, startTime);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "data", getCoupon, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.CouponController = CouponController;
