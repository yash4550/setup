import { Router } from "express";
import { CommonController } from "../controllers/CommonController";

class CommonRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
    this.put();
  }

  public post() {}

  public get() {
    this.router.get("/country", CommonController.country);
    this.router.get("/city/:state_id", CommonController.city);
    this.router.get("/state/:country_id", CommonController.state);
    this.router.get("/factory-reset", CommonController.factoryResetData);
  }

  public put() {}
}

export default new CommonRouter().router;
