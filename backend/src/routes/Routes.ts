import { Router } from "express";
import AuthRouter from "./admin/AuthRouter";
import UserRouter from "./admin/SchoolRouter";
import BannerRouter from "./admin/BannerRouter";
import AuthRoutes from "./app/AuthRoutes";
import UserRoutes from "./app/UserRoutes";
import ContentRouter from "./admin/ContentRouter";
import EmailTemplateRouter from "./admin/EmailTemplateRouter";
import NotificationRouter from "./admin/NotificationRouter";
import CommonRouter from "./CommonRouter";
import CategoryRouter from "./admin/CategoryRouter";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
    this.common();
  }

  app() {
    this.router.use("/app/auth", AuthRoutes);
    this.router.use("/app/user", UserRoutes);
  }
  admin() {
    this.router.use("/admin/auth", AuthRouter);
    this.router.use("/admin/user", UserRouter);
    this.router.use("/admin/banner", BannerRouter);
    this.router.use("/admin/content", ContentRouter);
    this.router.use("/admin/notification", NotificationRouter);
    this.router.use("/admin/email-template", EmailTemplateRouter);
    this.router.use("/admin/category", CategoryRouter);
  }
  common() {
    this.router.use("/common", CommonRouter);
  }
}
export default new Routes().router;
