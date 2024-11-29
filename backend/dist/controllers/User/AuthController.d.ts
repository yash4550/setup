export declare class AuthController {
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
    static login(req: any, res: any, next: any): Promise<void>;
    static loginNew(req: any, res: any, next: any): Promise<void>;
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
    static signUp(req: any, res: any, next: any): Promise<void>;
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
    static forgetpassword(req: any, res: any, next: any): Promise<void>;
    static forgetpasswordNew(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {post} /api/app/auth/resend-otp Resend OTP
     * @apiVersion 1.0.0
     * @apiName Resend OTP
     * @apiGroup App-auth
     * @apiParam {String} email Email.
     * @apiParam {String} type type.
     * */
    static resendOtp(req: any, res: any, next: any): Promise<void>;
    static resendOtpNew(req: any, res: any, next: any): Promise<void>;
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
    static verifyOTP(req: any, res: any, next: any): Promise<void>;
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
    static resetPassword(req: any, res: any, next: any): Promise<void>;
    static resetPasswordNew(req: any, res: any, next: any): Promise<void>;
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
    static socialSignUp(req: any, res: any, next: any): Promise<void>;
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
    static verifyOTPForAutentication(req: any, res: any, next: any): Promise<void>;
    static verifyOTPForAutenticationNew(req: any, res: any, next: any): Promise<void>;
    /**
     * @api {get} /api/app/auth/logout  Logout
     * @apiVersion 1.0.0
     * @apiName Logout
     * @apiGroup App-auth
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"Logout  Successfully","data":{},"exeTime":232}
     */
    static logout(req: any, res: any, next: any): Promise<void>;
    static signUpNew(req: any, res: any, next: any): Promise<void>;
    static verifyOTPNew(req: any, res: any, next: any): Promise<void>;
}
