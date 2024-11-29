import { Router } from "express";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
  }

  public post() {}
}

export default new UserRoutes().router;
