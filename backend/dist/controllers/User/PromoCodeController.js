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
exports.PromoCodeController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Coupon_1 = require("../../models/Coupon");
const CouponSummary_1 = require("../../models/CouponSummary");
const startTime = new Date().getTime();
class PromoCodeController {
    /**
     * @api {get} /api/app/user/get-promo-code/:id get-promo-code
     * @apiVersion 1.0.0
     * @apiName get-promo-code
     * @apiHeader {String} Authorization Pass jwt token.
     * @apiGroup App-User-Address
     */
    static getPromoCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPromoCOde = yield Coupon_1.default.find({ is_active: true });
                return ResponseHelper_1.default.ok(res, "Success", "Get Promo Code", getPromoCOde, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static applyPromoCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.user.id;
                const coupon_id = req.body.coupon_id;
                const promoAlreadyApply = yield CouponSummary_1.default.findOne({ is_active: true, coupon_id: coupon_id, user_id: user_id });
                if (promoAlreadyApply) {
                    return ResponseHelper_1.default.ok(res, "Success", "Promo Code Already Applied", {}, startTime);
                }
                else {
                    let getPromoCOde = yield Coupon_1.default.findOne({ is_active: true, _id: coupon_id });
                    // getPromoCOde.noOfUse=getPromoCOde.noOfUse+1;
                    // getPromoCOde.noOfUser=getPromoCOde.noOfUser+1;
                    const data = {
                        user_id,
                        coupon_id,
                        status: "apply",
                        maxAmount: getPromoCOde.maxAmount,
                        minAmount: getPromoCOde.minAmount,
                        promoCode: getPromoCOde.promoCode,
                        description: getPromoCOde.description,
                        title: getPromoCOde.title,
                        percentage: getPromoCOde.percentage
                    };
                    yield new CouponSummary_1.default(data).save();
                }
                return ResponseHelper_1.default.ok(res, "Success", "Promo Code Applied", {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PromoCodeController = PromoCodeController;
