import { Router } from "express";
import { SchoolController } from "../../controllers/Admin/SchoolController";
import Authentication from "../../Middlewares/Authnetication";

class SchoolRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
    this.put();
  }

  public post() {
    this.router.post("/add-school", Authentication.admin, SchoolController.addUser);
  }
  public get() {
    this.router.get("/list", Authentication.admin, SchoolController.list);
    this.router.get(
      "/get-list/:type",
      Authentication.admin,
      SchoolController.getList
    );
  }


  public put() {
    this.router.put(
      "/edit-user/:id",
      Authentication.admin,
      SchoolController.editUser
    );
    this.router.put(
      "/status-change/:id",
      Authentication.admin,
      SchoolController.statusChange
    );
    this.router.put(
      "/delete-account/:id",
      Authentication.admin,
      SchoolController.deleteUser
    );
    
    this.router.put(
      "/reset-password/:id",
      Authentication.admin,
      SchoolController.resetPassword
    );
  }
}

export default new SchoolRouter().router;
