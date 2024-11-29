"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthValidation_1 = require("../../validators/app/AuthValidation");
const AuthController_1 = require("../../controllers/User/AuthController");
const Authnetication_1 = require("../../Middlewares/Authnetication");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
    }
    post() {
        this.router.post("/login", AuthValidation_1.default.loginValidation, AuthController_1.AuthController.login);
        this.router.post("/login-new", 
        // AuthValidation.loginValidation,
        AuthController_1.AuthController.loginNew);
        this.router.post("/sign-up", AuthValidation_1.default.signUpValidation, AuthController_1.AuthController.signUp);
        this.router.post("/forget-password", AuthValidation_1.default.forgetPasswordValidation, AuthController_1.AuthController.forgetpassword);
        this.router.post("/reset-password", AuthValidation_1.default.resetPasswordValidation, AuthController_1.AuthController.resetPassword);
        this.router.post("/forget-password-new", 
        // AuthValidation.forgetPasswordValidation,
        AuthController_1.AuthController.forgetpasswordNew);
        this.router.post("/reset-password-new", 
        // AuthValidation.resetPasswordValidation,
        AuthController_1.AuthController.resetPasswordNew);
        this.router.post("/verify-otp", AuthValidation_1.default.verifyOTPValidation, AuthController_1.AuthController.verifyOTP);
        this.router.post("/verify-otp-new", 
        // AuthValidation.verifyOTPValidation,
        AuthController_1.AuthController.verifyOTPNew);
        this.router.post("/sign-up-new", 
        // AuthValidation.signUpValidation,
        AuthController_1.AuthController.signUpNew);
        this.router.post("/verify-otp-authenticate", AuthValidation_1.default.verifyOTPValidation, AuthController_1.AuthController.verifyOTPForAutentication);
        this.router.post("/verify-otp-authenticate-new", 
        // AuthValidation.verifyOTPValidation,
        AuthController_1.AuthController.verifyOTPForAutenticationNew);
        this.router.post("/social-signup", AuthValidation_1.default.socialSignUpValidation, AuthController_1.AuthController.socialSignUp);
        this.router.post("/resend-otp", AuthValidation_1.default.resendOtpValidation, AuthController_1.AuthController.resendOtp);
        this.router.post("/resend-otp-new", 
        // AuthValidation.resendOtpValidation,
        AuthController_1.AuthController.resendOtpNew);
    }
    get() {
        this.router.get("/logout", Authnetication_1.default.user, AuthController_1.AuthController.logout);
    }
}
exports.default = new AuthRoutes().router;
