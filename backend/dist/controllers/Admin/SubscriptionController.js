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
exports.SubscriptionController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Subscription_1 = require("../../models/Subscription");
const express = require("express");
class SubscriptionController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const list = yield Subscription_1.default.find({}).sort({
                    created_at: -1,
                });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static addSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { dueDate, cancellationDate, type, price, session, validMonth, language, benefitsList, month, } = req.body;
                const getSubscription = yield Subscription_1.default.findOne({
                    type: type,
                    is_active: true,
                });
                if (getSubscription)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "Subscription already exist with this type", getSubscription, startTime);
                const data = {
                    dueDate,
                    cancellationDate,
                    type,
                    price,
                    session,
                    validMonth,
                    language,
                    totalPrice: price * session,
                    benefits: benefitsList,
                    month: month,
                };
                const user = yield new Subscription_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Subscription Successfully", user);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { dueDate, cancellationDate, type, price, session, validMonth, language, benefitsList, month, } = req.body;
                const getSubscription = yield Subscription_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getSubscription)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Subscription not found", getSubscription, startTime);
                const isCHeck = yield Subscription_1.default.findOne({
                    type: type,
                    is_active: true,
                    _id: { $ne: req.params.id },
                });
                if (isCHeck)
                    return ResponseHelper_1.default.conflict(res, "COFLICT", "Subscription already exist with this type", isCHeck, startTime);
                (getSubscription.dueDate = dueDate ? dueDate : getSubscription.dueDate),
                    (getSubscription.cancellationDate = cancellationDate
                        ? cancellationDate
                        : getSubscription.cancellationDate),
                    (getSubscription.type = type ? type : getSubscription.type),
                    (getSubscription.price = price ? price : getSubscription.price),
                    (getSubscription.session = session ? session : getSubscription.session),
                    (getSubscription.validMonth = validMonth
                        ? validMonth
                        : getSubscription.validMonth),
                    (getSubscription.session = session ? session : getSubscription.session),
                    (getSubscription.language = language
                        ? language
                        : getSubscription.language);
                getSubscription.month = month ? month : getSubscription.month;
                (getSubscription.totalPrice =
                    getSubscription.price * getSubscription.session),
                    (getSubscription.benefits = benefitsList ? benefitsList : []);
                getSubscription.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Subscription Successfully", getSubscription, startTime);
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
                const getSubscription = yield Subscription_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getSubscription)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Subscription not found", getSubscription, startTime);
                const checkSunscriptionExists = yield Subscription_1.default.findOne({
                    type: getSubscription.type,
                    is_active: true,
                    _id: { $ne: getSubscription._id },
                });
                if (checkSunscriptionExists) {
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Status not change because already created this type of plan", getSubscription, startTime);
                }
                (getSubscription.is_active = !getSubscription.is_active),
                    getSubscription.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getSubscription, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const getExpact = yield Subscription_1.default.findOne({
                    _id: req.params.id,
                }).populate("therapists psychologistLanguage languageId areaOfExperties");
                if (!getExpact)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Expact not found", getExpact, startTime);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getExpact, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.SubscriptionController = SubscriptionController;
