import { Router } from "express";
import Authentication from "../../Middlewares/Authnetication";
import CategoryController from "../../controllers/Admin/CategoryController";

class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
    this.put();
  }

  public post() {
    this.router.post(
      "/add-category",
      Authentication.admin,
      CategoryController.addCategory
    );
  }
  public get() {
    this.router.get("/list", Authentication.admin, CategoryController.list);
  }
  public put() {}
}

export default new CategoryRouter().router;
