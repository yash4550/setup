declare class ProductController {
    static list(req: any, res: any, next: any): Promise<void>;
    static addProduct(req: any, res: any, next: any): Promise<void>;
}
export default ProductController;
