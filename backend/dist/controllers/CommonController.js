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
exports.CommonController = void 0;
const Country_1 = require("../models/Country");
const State_1 = require("../models/State");
const City_1 = require("../models/City");
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const Location_1 = require("../models/Location");
const Project_1 = require("../models/Project");
const Category_1 = require("../models/Category");
const Product_1 = require("../models/Product");
const mongoose = require("mongoose");
const Downtown_1 = require("../models/Downtown");
const DowntownRefineHistory_1 = require("../models/DowntownRefineHistory");
const DowntownHistory_1 = require("../models/DowntownHistory");
const Activity_1 = require("../models/Activity");
const startTime = new Date().getTime();
class CommonController {
    /**
     * @api {get} /api/common/country Country List
     * @apiVersion 1.0.0
     * @apiName Country List
     * @apiGroup App-Common
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"list","data":{"data":[{"name":"Afghanistan","region":"Asia","id":"1","latitude":33,"longitude":65,"emoji":"🇦🇫","currency":"AFN","currency_symbol":"؋","phonecode":1,"is_status":true,"_id":"646b2e0f46865f1f6556529e","iso3":"AFG","iso2":"AF","numeric_code":"004","phone_code":"93","capital":"Kabul","currency_name":"Afghan afghani","tld":".af","native":"افغانستان","subregion":"Southern Asia","timezones":[{"zoneName":"Asia/Kabul","gmtOffset":16200,"gmtOffsetName":"UTC+04:30","abbreviation":"AFT","tzName":"Afghanistan Time"}],"translations":{"kr":"아프가니스탄","pt-BR":"Afeganistão","pt":"Afeganistão","nl":"Afghanistan","hr":"Afganistan","fa":"افغانستان","de":"Afghanistan","es":"Afganistán","fr":"Afghanistan","ja":"アフガニスタン","it":"Afghanistan","cn":"阿富汗","tr":"Afganistan"},"emojiU":"U+1F1E6 U+1F1EB"},{"name":"Aland Islands","region":"Europe","id":"2","latitude":60.116667,"longitude":19.9,"emoji":"🇦🇽","currency":"EUR","currency_symbol":"€","phonecode":1,"is_status":true,"_id":"646b2e0f46865f1f6556529f","iso3":"ALA","iso2":"AX","numeric_code":"248","phone_code":"+358-18","capital":"Mariehamn","currency_name":"Euro","tld":".ax","native":"Åland","subregion":"Northern Europe","timezones":[{"zoneName":"Europe/Mariehamn","gmtOffset":7200,"gmtOffsetName":"UTC+02:00","abbreviation":"EET","tzName":"Eastern European Time"}],"translations":{"kr":"올란드 제도","pt-BR":"Ilhas de Aland","pt":"Ilhas de Aland","nl":"Ålandeilanden","hr":"Ålandski otoci","fa":"جزایر الند","de":"Åland","es":"Alandia","fr":"Åland","ja":"オーランド諸島","it":"Isole Aland","cn":"奥兰群岛","tr":"Åland Adalari"},"emojiU":"U+1F1E6 U+1F1FD"},{"name":"Albania","region":"Europe","id":"3","latitude":41,"longitude":20,"emoji":"🇦🇱","currency":"ALL","currency_symbol":"Lek","phonecode":1,"is_status":true,"_id":"646b2e0f46865f1f655652a0","iso3":"ALB","iso2":"AL","numeric_code":"008","phone_code":"355","capital":"Tirana","currency_name":"Albanian lek","tld":".al","native":"Shqipëria","subregion":"Southern Europe","timezones":[{"zoneName":"Europe/Tirane","gmtOffset":3600,"gmtOffsetName":"UTC+01:00","abbreviation":"CET","tzName":"Central European Time"}],"translations":{"kr":"알바니아","pt-BR":"Albânia","pt":"Albânia","nl":"Albanië","hr":"Albanija","fa":"آلبانی","de":"Albanien","es":"Albania","fr":"Albanie","ja":"アルバニア","it":"Albania","cn":"阿尔巴尼亚","tr":"Arnavutluk"},"emojiU":"U+1F1E6 U+1F1F1"}]},"exeTime":118193}
   
    */
    static country(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield Country_1.default.find().sort({ name: 1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    /**
     * @api {get} /api/common/state/country_id State List
     * @apiVersion 1.0.0
     * @apiName State List
     * @apiGroup App-Common
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"list","data":{"data":[{"name":"Badakhshan","country_id":1,"state_code":"BDS","latitude":"36.73477250","longitude":"70.81199530","is_status":true,"_id":"646b2e3c46865f1f65565399","id":3901,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Badghis","country_id":1,"state_code":"BDG","latitude":"35.16713390","longitude":"63.76953840","is_status":true,"_id":"646b2e3c46865f1f6556539a","id":3871,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Baghlan","country_id":1,"state_code":"BGL","latitude":"36.17890260","longitude":"68.74530640","is_status":true,"_id":"646b2e3c46865f1f6556539b","id":3875,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Balkh","country_id":1,"state_code":"BAL","latitude":"36.75506030","longitude":"66.89753720","is_status":true,"_id":"646b2e3c46865f1f6556539c","id":3884,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Bamyan","country_id":1,"state_code":"BAM","latitude":"34.81000670","longitude":"67.82121040","is_status":true,"_id":"646b2e3c46865f1f6556539d","id":3872,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Daykundi","country_id":1,"state_code":"DAY","latitude":"33.66949500","longitude":"66.04635340","is_status":true,"_id":"646b2e3c46865f1f6556539e","id":3892,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Farah","country_id":1,"state_code":"FRA","latitude":"32.49532800","longitude":"62.26266270","is_status":true,"_id":"646b2e3c46865f1f6556539f","id":3899,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Faryab","country_id":1,"state_code":"FYB","latitude":"36.07956130","longitude":"64.90595500","is_status":true,"_id":"646b2e3c46865f1f655653a0","id":3889,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Ghazni","country_id":1,"state_code":"GHA","latitude":"33.54505870","longitude":"68.41739720","is_status":true,"_id":"646b2e3c46865f1f655653a1","id":3870,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Ghōr","country_id":1,"state_code":"GHO","latitude":"34.09957760","longitude":"64.90595500","is_status":true,"_id":"646b2e3c46865f1f655653a2","id":3888,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Helmand","country_id":1,"state_code":"HEL","latitude":"39.29893610","longitude":"-76.61604720","is_status":true,"_id":"646b2e3c46865f1f655653a3","id":3873,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Herat","country_id":1,"state_code":"HER","latitude":"34.35286500","longitude":"62.20402870","is_status":true,"_id":"646b2e3c46865f1f655653a4","id":3887,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Jowzjan","country_id":1,"state_code":"JOW","latitude":"36.89696920","longitude":"65.66585680","is_status":true,"_id":"646b2e3c46865f1f655653a5","id":3886,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Kabul","country_id":1,"state_code":"KAB","latitude":"34.55534940","longitude":"69.20748600","is_status":true,"_id":"646b2e3c46865f1f655653a6","id":3902,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Kandahar","country_id":1,"state_code":"KAN","latitude":"31.62887100","longitude":"65.73717490","is_status":true,"_id":"646b2e3c46865f1f655653a7","id":3890,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Kapisa","country_id":1,"state_code":"KAP","latitude":"34.98105720","longitude":"69.62145620","is_status":true,"_id":"646b2e3c46865f1f655653a8","id":3879,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Khost","country_id":1,"state_code":"KHO","latitude":"33.33384720","longitude":"69.93716730","is_status":true,"_id":"646b2e3c46865f1f655653a9","id":3878,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Kunar","country_id":1,"state_code":"KNR","latitude":"34.84658930","longitude":"71.09731700","is_status":true,"_id":"646b2e3c46865f1f655653aa","id":3876,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Kunduz Province","country_id":1,"state_code":"KDZ","latitude":"36.72855110","longitude":"68.86789820","is_status":true,"_id":"646b2e3c46865f1f655653ab","id":3900,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Laghman","country_id":1,"state_code":"LAG","latitude":"34.68976870","longitude":"70.14558050","is_status":true,"_id":"646b2e3c46865f1f655653ac","id":3891,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Logar","country_id":1,"state_code":"LOG","latitude":"34.01455180","longitude":"69.19239160","is_status":true,"_id":"646b2e3c46865f1f655653ad","id":3897,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Nangarhar","country_id":1,"state_code":"NAN","latitude":"34.17183130","longitude":"70.62167940","is_status":true,"_id":"646b2e3c46865f1f655653ae","id":3882,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Nimruz","country_id":1,"state_code":"NIM","latitude":"31.02614880","longitude":"62.45041540","is_status":true,"_id":"646b2e3c46865f1f655653af","id":3896,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Nuristan","country_id":1,"state_code":"NUR","latitude":"35.32502230","longitude":"70.90712360","is_status":true,"_id":"646b2e3c46865f1f655653b0","id":3880,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Paktia","country_id":1,"state_code":"PIA","latitude":"33.70619900","longitude":"69.38310790","is_status":true,"_id":"646b2e3c46865f1f655653b1","id":3894,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Paktika","country_id":1,"state_code":"PKA","latitude":"32.26453860","longitude":"68.52471490","is_status":true,"_id":"646b2e3c46865f1f655653b2","id":3877,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Panjshir","country_id":1,"state_code":"PAN","latitude":"38.88023910","longitude":"-77.17172380","is_status":true,"_id":"646b2e3c46865f1f655653b3","id":3881,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Parwan","country_id":1,"state_code":"PAR","latitude":"34.96309770","longitude":"68.81088490","is_status":true,"_id":"646b2e3c46865f1f655653b4","id":3895,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Samangan","country_id":1,"state_code":"SAM","latitude":"36.31555060","longitude":"67.96428630","is_status":true,"_id":"646b2e3c46865f1f655653b5","id":3883,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Sar-e Pol","country_id":1,"state_code":"SAR","latitude":"36.21662800","longitude":"65.93336000","is_status":true,"_id":"646b2e3c46865f1f655653b6","id":3885,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Takhar","country_id":1,"state_code":"TAK","latitude":"36.66980130","longitude":"69.47845410","is_status":true,"_id":"646b2e3c46865f1f655653b7","id":3893,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Urozgan","country_id":1,"state_code":"URU","latitude":"32.92712870","longitude":"66.14152630","is_status":true,"_id":"646b2e3c46865f1f655653b8","id":3898,"country_code":"AF","country_name":"Afghanistan","type":null},{"name":"Zabul","country_id":1,"state_code":"ZAB","latitude":"32.19187820","longitude":"67.18944880","is_status":true,"_id":"646b2e3c46865f1f655653b9","id":3874,"country_code":"AF","country_name":"Afghanistan","type":null}]},"exeTime":288805}
     */
    static state(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield State_1.default.find({ country_id: req.params.country_id }).sort({
                    name: 1,
                });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    /**
     * @api {get} /api/common/city/state_id City List
     * @apiVersion 1.0.0
     * @apiName City List
     * @apiGroup App-Common
     * @apiSuccessExample {json} Success-Response:
     * {"status":200,"statusText":"SUCCESS","message":"list","data":{"data":[{"name":"Ashkāsham","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"36.68333000","longitude":"71.53333000","is_status":true,"_id":"646b2e6246865f1f6556676f","id":52,"wikiDataId":"Q4805192"},{"name":"Fayzabad","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"37.11664000","longitude":"70.58002000","is_status":true,"_id":"646b2e6246865f1f65566770","id":68,"wikiDataId":"Q156558"},{"name":"Jurm","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"36.86477000","longitude":"70.83421000","is_status":true,"_id":"646b2e6246865f1f65566771","id":78,"wikiDataId":"Q10308323"},{"name":"Khandūd","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"36.95127000","longitude":"72.31800000","is_status":true,"_id":"646b2e6246865f1f65566772","id":84,"wikiDataId":"Q3290334"},{"name":"Rāghistān","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"37.66079000","longitude":"70.67346000","is_status":true,"_id":"646b2e6246865f1f65566773","id":115,"wikiDataId":"Q2670909"},{"name":"Wākhān","state_id":3901,"state_name":"Badakhshan","state_code":"BDS","country_id":1,"country_code":"AF","country_name":"Afghanistan","latitude":"37.05710000","longitude":"73.34928000","is_status":true,"_id":"646b2e6246865f1f65566774","id":131,"wikiDataId":"Q2509959"}]},"exeTime":35986}
     */
    static city(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield City_1.default.find({
                    state_id: req.params.state_id,
                }).sort({ name: 1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static locationList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield Location_1.default.find({}).sort({ name: 1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static projectList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield Project_1.default.find({}).sort({ name: 1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static categoryList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield Category_1.default.find({}).sort({ created_at: -1 }).limit(12);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static categoryAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 14,
                };
                let filteredQuery = {};
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            name: 1,
                        },
                    },
                ];
                var myAggregate = Category_1.default.aggregate(query);
                const list = yield Category_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static productList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 12,
                };
                let filteredQuery = {
                    category: new mongoose.Types.ObjectId(req.params.id),
                };
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                let query = [
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
                            as: "categoryData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$categoryData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            price: 1,
                            discountPrice: 1,
                            image: 1,
                            "categoryData.name": 1,
                            "categoryData._id": 1,
                        },
                    },
                ];
                var myAggregate = Product_1.default.aggregate(query);
                const list = yield Product_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static productDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = yield Product_1.default.findOne({ _id: req.params.id }).populate("category");
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, startTime);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static factoryResetData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Downtown_1.default.deleteMany({});
                yield DowntownRefineHistory_1.default.deleteMany({});
                yield DowntownHistory_1.default.deleteMany({});
                yield Activity_1.default.deleteMany({});
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Data is reset Successfully", {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CommonController = CommonController;
