export interface Environment {
    nodeEnv: string;
    dbUrl: string;
    baseUrl: string;
    awsSecretKey: string;
    awsAccessKey: string;
    region: string;
    s3Bucket: string;
    authToken: string;
    accountSid: string;
}
export declare function env(): Environment;
