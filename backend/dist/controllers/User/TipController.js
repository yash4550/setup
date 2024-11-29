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
exports.TipController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Tip_1 = require("../../models/Tip");
const TipAmount_1 = require("../../models/TipAmount");
const startTime = new Date().getTime();
class TipController {
    /**
     * @api {post} /api/app/tip/add-tip  Add Tip
     * @apiVersion 1.0.0
     * @apiName Add Tip
     * @apiGroup App-TIP
     * @apiHeader {String} Authorization Pass jwt token.
     * @apiParam {Number} amount  amount.
     * @apiParam {String} driverId  driverId.
     * @apiParamExample {json} Normal-signUp-Request-Example:
     * {"amount":20,"driverId":""}
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"statusText":"SUCCESS","message":"add tip","data":[]}
     */
    static addTip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driverId, amount } = req.body;
            try {
                const data = {
                    driverId,
                    amount,
                    customerId: req.user.id,
                };
                yield new Tip_1.default(data).save();
                return ResponseHelper_1.default.ok(res, "Success", "Add Tip", {}, startTime);
            }
            catch (error) { }
        });
    }
    /**
     * @api {get} /api/app/tip/get-tip  Get Tip
     * @apiVersion 1.0.0
     * @apiName Get Tip
     * @apiGroup App-TIP
     * @apiHeader {String} Authorization Pass jwt token.
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"statusText":"SUCCESS","message":"get Tip","data":[]}
     */
    static getTip(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driverId, amount } = req.body;
            try {
                const getTip = yield Tip_1.default.find({ customerId: req.user.id }).populate("driverId");
                return ResponseHelper_1.default.ok(res, "Success", " get Tip", getTip, startTime);
            }
            catch (error) { }
        });
    }
    /**
     * @api {get} /api/app/tip/get-tip-amount  Get Tip Amount
     * @apiVersion 1.0.0
     * @apiName Get Tip Amount
     * @apiGroup App-TIP
     * @apiHeader {String} Authorization Pass jwt token.
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"Success","message":" get Tip Amount","data":{"data":[{"is_status":true,"_id":"663092b7f0362d4c04a585c1","amount":10,"created_at":"2024-04-30T06:41:59.552Z","updated_at":"2024-04-30T06:41:59.552Z","__v":0},{"is_status":true,"_id":"663092b7f0362d4c04a585c4","amount":5,"created_at":"2024-04-30T06:41:59.553Z","updated_at":"2024-04-30T06:41:59.553Z","__v":0},{"is_status":true,"_id":"663092b7f0362d4c04a585c2","amount":20,"created_at":"2024-04-30T06:41:59.553Z","updated_at":"2024-04-30T06:41:59.553Z","__v":0},{"is_status":true,"_id":"663092b7f0362d4c04a585c3","amount":30,"created_at":"2024-04-30T06:41:59.553Z","updated_at":"2024-04-30T06:41:59.553Z","__v":0}]},"exeTime":25438}
     */
    static getTipAmountList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTipAmount = yield TipAmount_1.default.find().sort({ amount: 1 });
                return ResponseHelper_1.default.ok(res, "Success", " get Tip Amount", getTipAmount, startTime);
            }
            catch (error) { }
        });
    }
}
exports.TipController = TipController;
