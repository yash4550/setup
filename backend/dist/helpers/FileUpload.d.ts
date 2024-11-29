import { S3 } from "aws-sdk";
export declare class FileUpload {
    constructor();
    static s3: S3;
    static uploadInS3(image: any, path: any, fileExtension: any): Promise<string | false>;
    static deleteFromS3(path: any): Promise<boolean>;
}
export default FileUpload;
