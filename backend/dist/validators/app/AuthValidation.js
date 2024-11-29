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
var UserTypeRole;
(function (UserTypeRole) {
    UserTypeRole["Expact"] = "Expact";
    UserTypeRole["Psychologist"] = "Psychologist";
})(UserTypeRole || (UserTypeRole = {}));
var LoginTypeRole;
(function (LoginTypeRole) {
    LoginTypeRole["Email"] = "Email";
    LoginTypeRole["Google"] = "Google";
    LoginTypeRole["Facebook"] = "Facebook";
    LoginTypeRole["Apple"] = "Apple";
})(LoginTypeRole || (LoginTypeRole = {}));
class AuthValidation {
    static loginValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required(),
                type: Joi.string().required(),
                deviceToken: Joi.string().optional().allow("", null),
                voipToken: Joi.string().optional().allow("", null),
                deviceType: Joi.string().optional().allow("", null),
                IdAddress: Joi.string().optional().allow("", null),
                geoLocation: Joi.string().optional().allow("", null),
                latitude: Joi.number().optional().allow("", null),
                longitude: Joi.number().optional().allow("", null),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static signUpValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                // password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
                password: Joi.string().required().messages({
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
                name: Joi.string().required(),
                type: Joi.string().required(),
                loginType: Joi.string().required(),
                deviceToken: Joi.string().optional().allow("", null),
                deviceType: Joi.string().optional().allow("", null),
                voipToken: Joi.string().optional().allow("", null),
                latitude: Joi.number().optional().allow("", null),
                longitude: Joi.number().optional().allow("", null),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static socialSignUpValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().optional().email().allow("", null),
                name: Joi.string().optional().allow("", null),
                type: Joi.string().required(),
                profileImage: Joi.string().optional().allow("", null),
                loginType: Joi.string().required(),
                deviceToken: Joi.string().optional().allow("", null),
                socialId: Joi.string().required().allow("", null),
                voipToken: Joi.string().optional().allow("", null),
                geoLocation: Joi.string().optional().allow("", null),
                IdAddress: Joi.string().optional().allow("", null),
                deviceType: Joi.string().optional().allow("", null),
                latitude: Joi.number().optional().allow("", null),
                longitude: Joi.number().optional().allow("", null),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static resendOtpValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required(),
                type: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static profileValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                phoneNumber: Joi.string()
                    .required()
                    .pattern(/^[0-9]+$/)
                    .max(15)
                    .min(9),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static forgetPasswordValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static verifyOTPValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                otp: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    static resetPasswordValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                email: Joi.string().required().email(),
                password: Joi.string().required(),
            });
            const isValid = yield (0, ValidationHelper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = AuthValidation;
