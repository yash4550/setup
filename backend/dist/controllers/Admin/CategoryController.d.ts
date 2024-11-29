declare class CategoryController {
    static list(req: any, res: any, next: any): Promise<void>;
    static addCategory(req: any, res: any, next: any): Promise<void>;
}
export default CategoryController;
