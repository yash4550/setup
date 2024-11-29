"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function env() {
    return {
        nodeEnv: process.env.NODE_ENV || "dev",
        dbUrl: process.env.DB_URL ||
            "mongodb+srv://harshit:Lwe1poLYlCqeoMwe@cluster0.edlysma.mongodb.net/taxi",
        baseUrl: process.env.BASE_URL,
        awsSecretKey: process.env.aws_secret_key,
        awsAccessKey: process.env.aws_access_key,
        region: process.env.region,
        s3Bucket: process.env.s3_bucket,
        authToken: process.env.authToken,
        accountSid: process.env.accountSid,
    };
}
exports.env = env;
