declare class Authentication {
    constructor();
    static user(req: any, res: any, next: any): Promise<any>;
    static admin(req: any, res: any, next: any): Promise<any>;
}
export default Authentication;
