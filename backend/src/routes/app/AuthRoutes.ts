import { Router } from "express";

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
    this.get();
  }

  public post() {}
  public get() {}
}

export default new AuthRoutes().router;
