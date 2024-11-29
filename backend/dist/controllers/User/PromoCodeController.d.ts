export declare class PromoCodeController {
    /**
     * @api {get} /api/app/user/get-promo-code/:id get-promo-code
     * @apiVersion 1.0.0
     * @apiName get-promo-code
     * @apiHeader {String} Authorization Pass jwt token.
     * @apiGroup App-User-Address
     */
    static getPromoCode(req: any, res: any, next: any): Promise<void>;
    static applyPromoCode(req: any, res: any, next: any): Promise<void>;
}
