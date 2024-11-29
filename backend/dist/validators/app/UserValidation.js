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
// import { validate } from "../../helpers/ValidationHelper";
const Joi = require("joi");
// import { ReqInterface, ResInterface } from "../../interfaces/RequestInterface"
// import _RS from "../../helpers/ResponseHelper"
const ValidationHelper_1 = require("../../helpers/ValidationHelper");
class UserValidation {
    static applyDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                subscription: Joi.string().required(),
                promoCode: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static payNow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                subscription: Joi.string().required(),
                promoCode: Joi.string().optional().allow("", null),
                totalAmount: Joi.number().precision(2).required(),
                amount: Joi.number().precision(2).required(),
                discountAmount: Joi.number().precision(2).optional().allow("", null),
                paymentId: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static bookingSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                day: Joi.string().required(),
                to: Joi.string().required(),
                from: Joi.string().required(),
                date: Joi.date().required(),
                type: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static rescheduleSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                day: Joi.string().required(),
                to: Joi.string().required(),
                from: Joi.string().required(),
                date: Joi.date().required(),
                type: Joi.string().required(),
                sessionId: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static rating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                session: Joi.string().required(),
                rating: Joi.number().required(),
                review: Joi.string().optional().allow("", null),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static report(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                subject: Joi.string().required(),
                description: Joi.string().optional().allow("", null),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = UserValidation;
