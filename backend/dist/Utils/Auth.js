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
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
class Auth {
    constructor() {
        this.MAX_TOKEN_TIME = 600000;
    }
    generateOtp(size = 4) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = new Date().getTime();
            const next10min = currentTime + 10 * 60 * 1000;
            const otpExpiresTime = new Date(next10min);
            let otp = "";
            let val;
            val = Math.floor(1000 + Math.random() * 9000);
            val = String(val);
            otp = val.substring(0, 4);
            const otpData = {
                otp: parseInt(otp),
                otpExpiresTime: otpExpiresTime,
            };
            return otpData;
        });
    }
    decodeJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Jwt.verify(token, process.env.JWT_SECRET || 'taxi', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        return resolve(data);
                    }
                });
            });
        });
    }
    getToken(data, expiresIn, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Jwt.sign(data, process.env.JWT_SECRET || 'taxi', {
                    expiresIn,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    dateDiffInDays(date1, date2) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert the dates to Date objects
            const date1Obj = new Date(date1);
            const date2Obj = new Date(date2);
            // Calculate the difference in milliseconds
            const diffInMs = Math.abs(date2Obj - date1Obj);
            // Calculate the difference in days
            const msPerDay = 24 * 60 * 60 * 1000;
            const diffInDays = Math.floor(diffInMs / msPerDay);
            return diffInDays;
        });
    }
    comparePassword(candidatePassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.compare(candidatePassword, userPassword, (err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(hash);
                    }
                });
            });
        });
    }
}
let respObj = new Auth();
exports.default = respObj;
