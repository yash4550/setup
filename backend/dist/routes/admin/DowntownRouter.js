"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authnetication_1 = require("../../Middlewares/Authnetication");
const DowntownController_1 = require("../../controllers/Admin/DowntownController");
class DowntownRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.post();
        this.get();
        this.put();
    }
    post() {
        this.router.post("/add-data", Authnetication_1.default.admin, DowntownController_1.DowntownController.addDowntownData);
    }
    get() {
        this.router.get("/list", Authnetication_1.default.admin, DowntownController_1.DowntownController.list);
        this.router.get("/list-view/:id/:type", Authnetication_1.default.admin, DowntownController_1.DowntownController.viewDataonType);
        this.router.get("/list-view-new/:id/:type", Authnetication_1.default.admin, DowntownController_1.DowntownController.viewDataonTypeNew);
        this.router.get("/export-refine-data/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.listExportRefineData);
        this.router.get("/export-refine-data-new/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.listExportRefineData);
        this.router.get("/remove-duplicate-data/:type/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.removeDuplicateData);
        this.router.get("/undo-data/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.undoData);
        this.router.get("/view-data/:id/:type", Authnetication_1.default.admin, DowntownController_1.DowntownController.viewData);
        this.router.get("/get-activity-list/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.getActivity);
        this.router.post("/edit-data/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.editData);
        this.router.delete("/delete-file/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.deleteFile);
        this.router.put("/edit-file-data/:id", Authnetication_1.default.admin, DowntownController_1.DowntownController.editFileData);
    }
    put() { }
}
exports.default = new DowntownRouter().router;
