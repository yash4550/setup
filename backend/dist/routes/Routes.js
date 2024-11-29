"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = require("./admin/AuthRouter");
const UserRouter_1 = require("./admin/UserRouter");
const BannerRouter_1 = require("./admin/BannerRouter");
const AuthRoutes_1 = require("./app/AuthRoutes");
const UserRoutes_1 = require("./app/UserRoutes");
const ContentRouter_1 = require("./admin/ContentRouter");
const EmailTemplateRouter_1 = require("./admin/EmailTemplateRouter");
const NotificationRouter_1 = require("./admin/NotificationRouter");
const DowntownRouter_1 = require("./admin/DowntownRouter");
const LocationRouter_1 = require("./admin/LocationRouter");
const CommonRouter_1 = require("./CommonRouter");
const ProjectRouter_1 = require("./admin/ProjectRouter");
const CategoryRouter_1 = require("./admin/CategoryRouter");
const ProductRouter_1 = require("./admin/ProductRouter");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
        this.common();
    }
    app() {
        this.router.use("/app/auth", AuthRoutes_1.default);
        this.router.use("/app/user", UserRoutes_1.default);
    }
    admin() {
        this.router.use("/admin/auth", AuthRouter_1.default);
        this.router.use("/admin/user", UserRouter_1.default);
        this.router.use("/admin/banner", BannerRouter_1.default);
        this.router.use("/admin/content", ContentRouter_1.default);
        this.router.use("/admin/notification", NotificationRouter_1.default);
        this.router.use("/admin/email-template", EmailTemplateRouter_1.default);
        this.router.use("/admin/downtown", DowntownRouter_1.default);
        this.router.use("/admin/location", LocationRouter_1.default);
        this.router.use("/admin/project", ProjectRouter_1.default);
        this.router.use("/admin/category", CategoryRouter_1.default);
        this.router.use("/admin/product", ProductRouter_1.default);
    }
    common() {
        this.router.use("/common", CommonRouter_1.default);
    }
}
exports.default = new Routes().router;
