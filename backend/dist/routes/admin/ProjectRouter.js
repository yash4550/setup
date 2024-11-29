"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const ProjectController_1 = require("../../controllers/Admin/ProjectController");
class ProjectRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-project", Authnetication_1.default.admin, ProjectController_1.default.addProject);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, ProjectController_1.default.list);
    }
    put() {
        this.router.put("/edit-project/:id", Authnetication_1.default.admin, ProjectController_1.default.editProject);
    }
}
exports.default = new ProjectRouter().router;
