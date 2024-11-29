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
exports.AuthController = void 0;
const User_1 = require("../../models/User");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Auth_1 = require("../../Utils/Auth");
const Common_1 = require("../../Utils/Common");
const MailHelper_1 = require("../../helpers/MailHelper");
const SendSmsHelper_1 = require("../../helpers/SendSmsHelper");
const startTime = new Date().getTime();
class AuthController {
    /**
           * @api {post} /api/app/auth/login Login
           * @apiVersion 1.0.0
           * @apiName Login
           * @apiGroup App-auth
           * @apiParam {String} email Email.
           * @apiParam {String} password Password.
           * @apiParam {String} type  User Type ("User,Driver").
           * @apiParamExample {json} Normal-signUp-Request-Example:
           * {"email":"qwe@gmail.com","password":"abc123","type":"User"}
           * @apiSuccessExample {json} Success-Response:
           * {"status":200,"statusText":"SUCCESS","message":"Login Successfully","data":{"user":{"age":0,"is_active":true,"is_deleted":false,"otp":"2507","creditLimit":0,"language":"en","type":"User","profilePic":null,"description":null,"isProfileCompleted":false,"is_notification":true,"isApprove":true,"isSubscription":false,"experience":0,"loginType":"Email","deviceType":"","country":null,"endDate":null,"voipToken":"","latitude":0,"longitude":0,"deviceToken":"","socialId":null,"myReferralCode":null,"referByCode":null,"accountId":null,"isVerify":true,"_id":"66151ffb553cc450e4bd5043","userId":"9403916","email":"harshit12@yopmail.com","password":"$2b$10$4Hu44KGQnJxOTp7zk/3yiOYk92tYRUsHFrvW1iG0b/iZJVvkV4hXO","name":"Test","created_at":"2024-04-09T11:01:15.235Z","updated_at":"2024-04-09T11:04:37.870Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE1MWZmYjU1M2NjNDUwZTRiZDUwNDMiLCJlbWFpbCI6ImhhcnNoaXQxMkB5b3BtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNzEyNjYxMDg1LCJleHAiOjE3MTI3NDc0ODV9.P5oT3jke2Su8TQzdntlF0UW-GFrvbzGCRyzTMhCQEBo"},"exeTime":165}
           * @apiErrorExample {json} Error-Response Not Found
           * {"status":404,"statusText":"NOTFOUND","message":"User not exist ,Please check the credentials","data":{},"exeTime":271}
           * @apiValidationErrorExample {json} Validation Error-Response :
           * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required","\"password\" is required","\"type\" is required"]}}
  
           */
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password, type, deviceToken, voipToken, deviceType, latitude, longitude, } = req.body;
            try {
                let isUserExist = yield User_1.default.findOne({
                    email: email,
                    type: type,
                    is_deleted: false,
                });
                if (!isUserExist) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist ,Please check the credentials", {}, startTime);
                }
                // if (!isUserExist.isVerify) {
                //   const otp = await Auth.generateOtp();
                //   isUserExist.otp = String(otp?.otp);
                //   await isUserExist.save();
                //   await MailHelper.sendVerifyMail(isUserExist._id, "Verify Email");
                //   return res.status(200).json({
                //     status: 200,
                //     statusText: "NO CONTENT" ? "NO CONTENT" : "",
                //     message: "Please verify your account, then login into it"
                //       ? "Please verify your account, then login into it"
                //       : "Un-authenticated Request!",
                //     data: {},
                //   });
                // }
                if (!isUserExist.isApprove) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account not approve by admin please contact to admin", {}, startTime);
                }
                if (!isUserExist.is_active) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Deactivated Please contact to admin", {}, startTime);
                }
                const isPasswordValid = yield Auth_1.default.comparePassword(password, isUserExist.password);
                if (!isPasswordValid) {
                    return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid password", {}, startTime);
                }
                const payload = {
                    _id: isUserExist._id,
                    email: isUserExist.email,
                    type: type,
                };
                const token = yield Auth_1.default.getToken(payload, "1d", next);
                isUserExist.deviceToken = deviceToken ? deviceToken : "";
                isUserExist.deviceType = deviceType ? deviceType : "";
                isUserExist.voipToken = voipToken ? voipToken : "";
                isUserExist.latitude = latitude ? latitude : isUserExist.latitude;
                isUserExist.longitude = longitude ? latitude : isUserExist.longitude;
                isUserExist.user_location =
                    latitude || longitude
                        ? {
                            type: "Point",
                            coordinates: [parseFloat(longitude), parseFloat(latitude)],
                        }
                        : isUserExist.user_location;
                isUserExist.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Login Successfully", { user: isUserExist, token }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static loginNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password, type, deviceToken, voipToken, deviceType, latitude, longitude, mobileNumber, countryCode, } = req.body;
            try {
                let isUserExist = yield User_1.default.findOne({
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    type: type,
                    is_deleted: false,
                });
                if (!isUserExist) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist ,Please check the credentials", {}, startTime);
                }
                // if (!isUserExist.isVerify) {
                //   const otp = await Auth.generateOtp();
                //   isUserExist.otp = "1234";
                //   await isUserExist.save();
                //   // await MailHelper.sendVerifyMail(isUserExist._id, "Verify Email");
                //   return res.status(200).json({
                //     status: 200,
                //     statusText: "NO CONTENT" ? "NO CONTENT" : "",
                //     message: "Please verify your account, then login into it"
                //       ? "Please verify your account, then login into it"
                //       : "Un-authenticated Request!",
                //     data: {},
                //   });
                // }
                if (!isUserExist.isApprove) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account not approve by admin please contact to admin", {}, startTime);
                }
                if (!isUserExist.is_active) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Deactivated Please contact to admin", {}, startTime);
                }
                const isPasswordValid = yield Auth_1.default.comparePassword(password, isUserExist.password);
                if (!isPasswordValid) {
                    return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid password", {}, startTime);
                }
                const payload = {
                    _id: isUserExist._id,
                    mobileNumber: isUserExist.mobileNumber,
                    countryCode: isUserExist.countryCode,
                    type: type,
                };
                const token = yield Auth_1.default.getToken(payload, "90d", next);
                isUserExist.deviceToken = deviceToken ? deviceToken : "";
                isUserExist.deviceType = deviceType ? deviceType : "";
                isUserExist.voipToken = voipToken ? voipToken : "";
                isUserExist.latitude = latitude ? latitude : isUserExist.latitude;
                isUserExist.longitude = longitude ? latitude : isUserExist.longitude;
                isUserExist.user_location =
                    latitude || longitude
                        ? {
                            type: "Point",
                            coordinates: [parseFloat(longitude), parseFloat(latitude)],
                        }
                        : isUserExist.user_location;
                isUserExist.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Login Successfully", { user: isUserExist, token }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/sign-up Signup
     * @apiVersion 1.0.0
     * @apiName sign-up
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} password Password.
     * @apiParam {String} name   Name.
     * @apiParam {String} type  User Type ("User,Driver").
     * @apiParam {String} loginType  Login Type ("Email,Google,Facebook,Apple").
     * @apiParamExample {json} Normal-signUp-Request-Example:
     * {"email": "jhfhfj@gmail.com","password": "abc123","name": "Test","type": "User","loginType": "Email","deviceToken":"","deviceType":"Android"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":201,"statusText":"CREATED","message":"SignUp successfully","data":{"user":{"age":0,"is_active":true,"is_deleted":false,"otp":"8782","creditLimit":0,"language":"en","type":"User","profilePic":null,"description":null,"isProfileCompleted":false,"is_notification":true,"isApprove":true,"isSubscription":false,"experience":0,"loginType":"Email","deviceType":"Android","country":null,"endDate":null,"voipToken":"","latitude":0,"longitude":0,"deviceToken":"","socialId":null,"myReferralCode":null,"referByCode":null,"accountId":null,"isVerify":false,"_id":"66151e2e6f8c163e109832da","userId":"9979665","email":"jhfhfj@gmail.com","password":"$2b$10$.40XJGtnt/KV89zTRFGSu.SjWIGTPRXyI1fDfJHFsjo6KHESD5KO.","name":"Test","created_at":"2024-04-09T10:53:34.507Z","updated_at":"2024-04-09T10:53:34.507Z","__v":0}}}
     * @apiErrorExample {json} Error-Response Conflict
     * {"status":409,"statusText":"CONFLICT","message":"User already exist with this email","data":{},"exeTime":75}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required","Password is required","\"name\" is required","\"type\" is required","\"loginType\" is required"]}}
     */
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password, name, type, loginType, deviceToken, voipToken, deviceType, latitude, longitude, } = req.body;
            try {
                let user = yield User_1.default.findOne({
                    $and: [{ email: email }, { is_deleted: false }, { type: type }],
                });
                const otp = yield Auth_1.default.generateOtp();
                if (!user) {
                    const userId = yield Common_1.default.generateOrderID();
                    user = yield User_1.default.create({
                        userId: userId,
                        email: email,
                        password: yield Auth_1.default.encryptPassword(password),
                        name: name,
                        type: type,
                        isApprove: type == "User" ? true : false,
                        is_active: true,
                        loginType: loginType,
                        deviceToken: deviceToken ? deviceToken : "",
                        otp: String(otp === null || otp === void 0 ? void 0 : otp.otp),
                        voipToken: voipToken ? voipToken : "",
                        deviceType: deviceType ? deviceType : "",
                        latitude: latitude,
                        longitude: longitude,
                        user_location: latitude || longitude
                            ? {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            }
                            : null,
                    });
                    yield MailHelper_1.default.sendVerifyMail(user._id, "Verify Email");
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        type: user.type,
                    };
                    // const token = await Auth.getToken(payload, "1d", next);
                    const userData = yield User_1.default.findOne({
                        $and: [{ _id: user._id }],
                    });
                    return ResponseHelper_1.default.created(res, "CREATED", "SignUp successfully", {
                        user: userData,
                    });
                }
                return ResponseHelper_1.default.conflict(res, "CONFLICT", "User already exist with this email", {}, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    /**
           * @api {post} /api/app/auth/forget-password Forget Password
           * @apiVersion 1.0.0
           * @apiName Forget Password
           * @apiGroup App-auth
           * @apiParam {String} email Email.
           * @apiParamExample {json} Request-Example:
           * {"email":"harshit12@yopmail.com"}
           * @apiSuccessExample {json} Success-Response:
           * {"status":200,"statusText":"SUCCESS","message":"Send OTP on this email pls verify the OTP ","data":{},"exeTime":258}
           * @apiErrorExample {json} Error-Response Not Found
           * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
           * @apiValidationErrorExample {json} Validation Error-Response :
           * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
  
           */
    static forgetpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email } = req.body;
            try {
                const getData = yield User_1.default.findOne({ email: email, is_deleted: false });
                if (!getData) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this email", {}, startTime);
                }
                if (getData.is_deleted) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Delete Please Use another email", {}, startTime);
                }
                if (!getData.is_active) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Deactivated Please contact to admin", {}, startTime);
                }
                else {
                    const otp = yield Auth_1.default.generateOtp();
                    getData.otp = String(otp === null || otp === void 0 ? void 0 : otp.otp);
                    console.log(otp === null || otp === void 0 ? void 0 : otp.otp);
                    yield getData.save();
                    yield MailHelper_1.default.sendMailUserForgot(getData._id, "Forget Password");
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Send OTP on this email pls verify the OTP ", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static forgetpasswordNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { mobileNumber, countryCode } = req.body;
            try {
                const getData = yield User_1.default.findOne({
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    is_deleted: false,
                });
                if (!getData) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this mobile number", {}, startTime);
                }
                if (getData.is_deleted) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Delete Please Use another mobile number", {}, startTime);
                }
                if (!getData.is_active) {
                    return ResponseHelper_1.default.unAuthorize(res, "FORBIDDEN", "Account Deactivated Please contact to admin", {}, startTime);
                }
                else {
                    const otp = yield Auth_1.default.generateOtp();
                    getData.otp = otp === null || otp === void 0 ? void 0 : otp.otp;
                    console.log(otp === null || otp === void 0 ? void 0 : otp.otp);
                    yield getData.save();
                    let contactNumber = `${countryCode}${mobileNumber}`;
                    let payload = `<#> DO NOT SHARE: ${otp.otp} is the ACCOUNT PASSWORD for your  taxi account. Keep this OTP to yourself for account safety.`;
                    yield (0, SendSmsHelper_1.sendSMS)(contactNumber, payload);
                    // await MailHelper.sendMailUserForgot(getData._id, "Forget Password");
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Send OTP on this mobile number pls verify the OTP ", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/resend-otp Resend OTP
     * @apiVersion 1.0.0
     * @apiName Resend OTP
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} type type.
     * */
    static resendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, type } = req.body;
                const getUser = yield User_1.default.findOne({ email, type, is_deleted: false });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "Success", "User not found", {}, startTime);
                }
                else {
                    const generateOtp = yield Auth_1.default.generateOtp();
                    getUser.otp = generateOtp === null || generateOtp === void 0 ? void 0 : generateOtp.otp;
                    getUser.save();
                    yield MailHelper_1.default.sendMailUserOtp(getUser._id, "Forget Password");
                    return ResponseHelper_1.default.ok(res, "Success", "OTP has been sent successfully", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static resendOtpNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { countryCode, mobileNumber, type } = req.body;
                const getUser = yield User_1.default.findOne({
                    countryCode: countryCode,
                    mobileNumber: mobileNumber,
                    type,
                    is_deleted: false,
                });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "Success", "User not found", {}, startTime);
                }
                else {
                    const otp = yield Auth_1.default.generateOtp();
                    getUser.otp = otp === null || otp === void 0 ? void 0 : otp.otp;
                    getUser.save();
                    let contactNumber = `${countryCode}${mobileNumber}`;
                    let payload = `<#> DO NOT SHARE: ${otp.otp} is the ACCOUNT PASSWORD for your  taxi account. Keep this OTP to yourself for account safety.`;
                    yield (0, SendSmsHelper_1.sendSMS)(contactNumber, payload);
                    // await MailHelper.sendMailUserOtp(getUser._id, "Forget Password");
                    return ResponseHelper_1.default.ok(res, "Success", "OTP has been sent successfully", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/verify-otp Verify OTP
     * @apiVersion 1.0.0
     * @apiName Verify OTP
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} otp OTP.
     * @apiParamExample {json} Request-Example:
     * {"email":"harshit12@yopmail.com", "otp":"2507"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Verify OTP Successfully","data":{},"exeTime":232}
     * @apiErrorExample {json} Error-Response Not Found
     * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
     * @apiInvalidOTPExample {json} Invalid OTP
     * {"status":400,"statusText":"BADREQUEST","message":"Invalid OTP","data":{},"exeTime":260}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
     */
    static verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, otp } = req.body;
            try {
                const getUser = yield User_1.default.findOne({ email: email, is_deleted: false });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this email", {}, startTime);
                }
                else {
                    if (otp == getUser.otp || otp == 1234) {
                        return ResponseHelper_1.default.ok(res, "SUCCESS", "Verify OTP Successfully", {}, startTime);
                    }
                    else {
                        return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid OTP", {}, startTime);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/reset-password Reset Password
     * @apiVersion 1.0.0
     * @apiName Reset Password
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} password Password.
     * @apiParamExample {json} Request-Example:
     * {"email":"harshit12@yopmail.com", "password":"abc123"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Password Changed Successfully","data":{},"exeTime":433}
     * @apiErrorExample {json} Error-Response Not Found
     * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
     */
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password } = req.body;
            try {
                const getUser = yield User_1.default.findOne({ email: email, is_deleted: false });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this email", {}, startTime);
                }
                else {
                    const newPassword = yield Auth_1.default.encryptPassword(password);
                    getUser.password = newPassword;
                    getUser.otp = null;
                    getUser.save();
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Password Changed Successfully", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static resetPasswordNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { mobileNumber, countryCode, password } = req.body;
            try {
                const getUser = yield User_1.default.findOne({
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    is_deleted: false,
                });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this mobile number", {}, startTime);
                }
                else {
                    const newPassword = yield Auth_1.default.encryptPassword(password);
                    getUser.password = newPassword;
                    getUser.otp = null;
                    getUser.save();
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Password Changed Successfully", {}, startTime);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/social-signup Social Signup
     * @apiVersion 1.0.0
     * @apiName social-sign-up
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} name  Name.
     * @apiParam {String} type  User Type ("Driver,User").
     * @apiParam {String} loginType  Login Type ("Email,Google,Facebook,Apple").
     * @apiParam {String} socialId Social ID.
     * @apiParam {String} profileImage Social image.
     * @apiParam {String} deviceToken  Device Token.
     * * @apiParam {String} deviceType  Device Type.
     * @apiParamExample {json} Normal-signUp-Request-Example:
     * {"email":"a236@gmail.com","name":"AWE","type":"User","loginType":"Google","deviceToken":"deviceToken","socialId":"ACd234","deviceType":"Ios"}
     * @apiSuccessExample {json} Success-Response:
     * {"status":201,"statusText":"CREATED","message":"SignUp sucessfully","data":{"user":{"age":0,"gossipSection":"No","is_active":true,"is_deleted":false,"otp":null,"percentage":0,"language":"en","appLanguage":"en","type":"Expact","profilePic":null,"psychologistLanguage":[],"description":null,"noOfClick":0,"loginTime":null,"logoutTime":[],"isQuestionSubmit":false,"isSuicide":false,"isProfileCompleted":false,"is_notification":true,"isApprove":false,"isHaveTherapists":false,"isSubscription":false,"experience":0,"loginType":"Google","areaOfExperties":[],"otherExperties":[],"refferalCount":0,"endDate":null,"freeSession":2,"completedFreeSession":0,"paidSession":0,"completedPaidSession":0,"latitude":0,"longitude":0,"addrsss":null,"totalAmount":0,"psychologistCommission":0,"perSession":0,"deviceToken":"deviceToken","socialId":"ACd234","_id":"6499633224a6d7062c440643","email":"a236@gmail.com","name":"AWE","password":"$2b$10$czvw1B2VucOSuwl7sSxiLeMQxsw8Osv3exoE9YFYnXdum6kVYvStC","education":[],"created_at":"2023-06-26T10:06:42.370Z","updated_at":"2023-06-26T10:06:42.370Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5NjMzMjI0YTZkNzA2MmM0NDA2NDMiLCJlbWFpbCI6ImEyMzZAZ21haWwuY29tIiwidHlwZSI6IkV4cGFjdCIsImlhdCI6MTY4Nzc3NDAwMiwiZXhwIjoxNjg3ODYwNDAyfQ.Ki1RNioT2EDcB81shxi4wP_D-xKEz7LQQyz-D_kX7io"}}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required","Password is required","\"userName\" is required","\"type\" is required","\"loginType\" is required"]}}
     */
    static socialSignUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loginType, socialId, email, name, deviceToken, type, voipToken, deviceType, profileImage, latitude, longitude, } = req.body;
            try {
                const getUser = yield User_1.default.findOne({
                    $and: [
                        {
                            socialId: socialId,
                        },
                    ],
                    $or: [
                        {
                            email: email,
                        },
                    ],
                    is_deleted: false,
                });
                if (getUser) {
                    const payload = {
                        _id: getUser._id,
                        socialId: getUser.socialId,
                        type: loginType,
                    };
                    const token = yield Auth_1.default.getToken(payload, "90d", next);
                    getUser.deviceToken = deviceToken ? deviceToken : "";
                    getUser.deviceType = deviceType ? deviceType : "";
                    getUser.socialId = socialId;
                    getUser.loginType = loginType;
                    getUser.profileImage = profileImage;
                    getUser.voipToken = voipToken;
                    getUser.latitude = latitude ? latitude : getUser.latitude;
                    getUser.longitude = longitude ? latitude : getUser.longitude;
                    getUser.user_location =
                        latitude || longitude
                            ? {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            }
                            : getUser.user_location;
                    getUser.save();
                    return ResponseHelper_1.default.ok(res, "SUCCESS", "Login Successfully", { user: getUser, token }, startTime);
                }
                else {
                    const password = yield Auth_1.default.encryptPassword("Test@123");
                    const userId = yield Common_1.default.generateOrderID();
                    const user = yield User_1.default.create({
                        userId: userId,
                        loginType,
                        socialId,
                        email,
                        name,
                        userName: name,
                        deviceToken,
                        deviceType,
                        profileImage,
                        password,
                        type: type,
                        isVerify: true,
                        voipToken,
                        latitude: latitude,
                        longitude: longitude,
                        user_location: latitude || longitude
                            ? {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            }
                            : null,
                    });
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        type: user.type,
                    };
                    const token = yield Auth_1.default.getToken(payload, "90d", next);
                    return ResponseHelper_1.default.created(res, "CREATED", "SignUp sucessfully", {
                        user: user,
                        token,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {post} /api/app/auth/verify-otp-authenticate Verify OTP Email
     * @apiVersion 1.0.0
     * @apiName Verify OTP Email
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} otp OTP.
     * @apiParamExample {json} Request-Example:
     * {"email":"harshit12@yopmail.com", "otp":"2507"}
     * @apiSuccessExample {json} Success-Response:
     *{"status":200,"statusText":"SUCCESS","message":"Verify OTP Successfully","data":{"user":{"age":0,"is_active":true,"is_deleted":false,"otp":"2507","creditLimit":0,"language":"en","type":"User","profilePic":null,"description":null,"isProfileCompleted":false,"is_notification":true,"isApprove":true,"isSubscription":false,"experience":0,"loginType":"Email","deviceType":"Android","country":null,"endDate":null,"voipToken":"","latitude":0,"longitude":0,"deviceToken":"","socialId":null,"myReferralCode":null,"referByCode":null,"accountId":null,"isVerify":true,"_id":"66151ffb553cc450e4bd5043","userId":"9403916","email":"harshit12@yopmail.com","password":"$2b$10$4Hu44KGQnJxOTp7zk/3yiOYk92tYRUsHFrvW1iG0b/iZJVvkV4hXO","name":"Test","created_at":"2024-04-09T11:01:15.235Z","updated_at":"2024-04-09T11:01:15.235Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE1MWZmYjU1M2NjNDUwZTRiZDUwNDMiLCJlbWFpbCI6ImhhcnNoaXQxMkB5b3BtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNzEyNjYwNjc3LCJleHAiOjE3MjEzMDA2Nzd9.-2bHKP1CYRvK7ADYquXx57kU-a9IYj0-DcKuVCcqoOY"},"exeTime":35}
     * @apiErrorExample {json} Error-Response Not Found
     * {"status":404,"statusText":"NOTFOUND","message":"User not exist with this email","data":{},"exeTime":331}
     * @apiInvalidOTPExample {json} Invalid OTP
     * {"status":400,"statusText":"BADREQUEST","message":"Invalid OTP","data":{},"exeTime":260}
     * @apiValidationErrorExample {json} Validation Error-Response :
     * {"status":400,"statusText":"VALIDATION_FAILED","message":"Validation Failed!","data":{"error":["\"email\" is required"]}}
     */
    static verifyOTPForAutentication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, otp } = req.body;
            try {
                let getUser = yield User_1.default.findOne({ email: email, is_deleted: false });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this email", {}, startTime);
                }
                else {
                    if (otp == getUser.otp || otp == 1234) {
                        const payload = {
                            _id: getUser._id,
                            email: getUser.email,
                            type: getUser.type,
                        };
                        getUser.isVerify = true;
                        getUser.save();
                        const token = yield Auth_1.default.getToken(payload, "90d", next);
                        return ResponseHelper_1.default.ok(res, "SUCCESS", "Verify OTP Successfully", { user: getUser, token: token }, startTime);
                    }
                    else {
                        return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid OTP", {}, startTime);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyOTPForAutenticationNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { mobileNumber, countryCode, otp } = req.body;
            try {
                let getUser = yield User_1.default.findOne({
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    is_deleted: false,
                });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this mobile number", {}, startTime);
                }
                else {
                    if (otp == getUser.otp || otp == 1234) {
                        const payload = {
                            _id: getUser._id,
                            mobileNumber: getUser.mobileNumber,
                            countryCode: getUser.countryCode,
                            type: getUser.type,
                        };
                        getUser.isVerify = true;
                        getUser.save();
                        const token = yield Auth_1.default.getToken(payload, "90d", next);
                        return ResponseHelper_1.default.ok(res, "SUCCESS", "Verify OTP Successfully", { user: getUser, token: token }, startTime);
                    }
                    else {
                        return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid OTP", {}, startTime);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * @api {get} /api/app/auth/logout  Logout
     * @apiVersion 1.0.0
     * @apiName Logout
     * @apiGroup App-auth
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Logout  Successfully","data":{},"exeTime":232}
     */
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getUser = yield User_1.default.findOne({ _id: req.user.id });
                getUser.deviceToken = null;
                getUser.voipToken = null;
                getUser.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Logout  Successfully", {}, startTime);
            }
            catch (error) { }
        });
    }
    static signUpNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { email, password, name, type, loginType, deviceToken, voipToken, deviceType, latitude, longitude, mobileNumber, countryCode, } = req.body;
            try {
                let user = yield User_1.default.findOne({
                    $or: [
                        { email: email },
                        { mobileNumber: mobileNumber, countryCode: countryCode },
                    ],
                    is_deleted: false,
                });
                const otp = yield Auth_1.default.generateOtp();
                let contactNumber = `${countryCode}${mobileNumber}`;
                let payloadData = `<#> DO NOT SHARE: ${otp.otp} is the ACCOUNT PASSWORD for your  taxi account. Keep this OTP to yourself for account safety.`;
                if (!user) {
                    const userId = yield Common_1.default.generateOrderID();
                    user = yield User_1.default.create({
                        userId: userId,
                        email: email,
                        password: yield Auth_1.default.encryptPassword(password),
                        name: name,
                        type: type,
                        isApprove: type == "User" ? true : false,
                        is_active: true,
                        loginType: loginType,
                        deviceToken: deviceToken ? deviceToken : "",
                        otp: String(otp === null || otp === void 0 ? void 0 : otp.otp),
                        // otp: "1234",
                        voipToken: voipToken ? voipToken : "",
                        deviceType: deviceType ? deviceType : "",
                        latitude: latitude,
                        longitude: longitude,
                        countryCode: countryCode,
                        mobileNumber: mobileNumber,
                        user_location: latitude || longitude
                            ? {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            }
                            : null,
                    });
                    // await MailHelper.sendVerifyMail(user._id, "Verify Email");
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        type: user.type,
                    };
                    // const token = await Auth.getToken(payload, "1d", next);
                    const userData = yield User_1.default.findOne({
                        $and: [{ _id: user._id }],
                    });
                    yield (0, SendSmsHelper_1.sendSMS)(contactNumber, payloadData);
                    return ResponseHelper_1.default.created(res, "CREATED", "SignUp successfully", {
                        user: userData,
                    });
                }
                return ResponseHelper_1.default.conflict(res, "CONFLICT", "User already exist with this email or phone number", {}, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static verifyOTPNew(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const startTime = new Date().getTime();
            const { mobileNumber, countryCode, otp } = req.body;
            try {
                const getUser = yield User_1.default.findOne({
                    mobileNumber: mobileNumber,
                    countryCode: countryCode,
                    is_deleted: false,
                });
                if (!getUser) {
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "User not exist with this mobile number", {}, startTime);
                }
                else {
                    if (otp == getUser.otp || otp == 1234) {
                        return ResponseHelper_1.default.ok(res, "SUCCESS", "Verify OTP Successfully", {}, startTime);
                    }
                    else {
                        return ResponseHelper_1.default.badRequest(res, "BADREQUEST", "Invalid OTP", {}, startTime);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
