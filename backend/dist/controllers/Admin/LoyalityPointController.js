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
exports.LoyalityPointController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const LoyalityPoint_1 = require("../../models/LoyalityPoint");
class LoyalityPointController {
    static getLoyalityData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const list = yield LoyalityPoint_1.default.findOne({});
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", list, startTime);
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
                const { redemptionRate, loyalityPointRedemption, conversionRate, loyalityPointConversion, } = req.body;
                const data = {
                    redemptionRate,
                    loyalityPointRedemption,
                    conversionRate,
                    loyalityPointConversion,
                };
                let updateData = yield LoyalityPoint_1.default.findOne({});
                if (updateData) {
                    (updateData.redemptionRate = redemptionRate
                        ? redemptionRate
                        : updateData.redemptionRate),
                        (updateData.loyalityPointRedemption = loyalityPointRedemption
                            ? loyalityPointRedemption
                            : updateData.loyalityPointRedemption),
                        (updateData.conversionRate = conversionRate
                            ? conversionRate
                            : updateData.conversionRate),
                        (updateData.loyalityPointConversion = loyalityPointConversion
                            ? loyalityPointConversion
                            : updateData.loyalityPointConversion),
                        updateData.save();
                }
                // await new LoyalityPoint(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", updateData, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.LoyalityPointController = LoyalityPointController;
