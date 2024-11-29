"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Banner_1 = require("../../models/Banner");
class BannerController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const list = yield Banner_1.default.find({}).sort({
                    created_at: -1,
                });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static addBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { title, imageUrl } = req.body;
                const data = {
                    title: title,
                    image: imageUrl,
                };
                const banner = yield new Banner_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Banner Successfully", banner);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { title, imageUrl } = req.body;
                const id = req.params.id;
                const getBanner = yield Banner_1.default.findOne({ _id: id });
                console.log(getBanner);
                if (!getBanner)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Banner not found", getBanner, startTime);
                // const data = {
                //   email: email,
                //   mobileNumber: mobileNumber,
                //   countryCode: countryCode,
                //   name: name,
                // };
                (getBanner.title = title ? title : getBanner.title),
                    (getBanner.image = imageUrl ? imageUrl : getBanner.image),
                    getBanner.save();
                // const user = await new User(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getBanner, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static statusChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const id = req.params.id;
                const getBanner = yield Banner_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getBanner)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Banner not found", getBanner, startTime);
                (getBanner.is_status = !getBanner.is_status), getBanner.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getBanner, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.BannerController = BannerController;
