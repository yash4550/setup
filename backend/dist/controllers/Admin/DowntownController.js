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
exports.DowntownController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Downtown_1 = require("../../models/Downtown");
const DowntownHistory_1 = require("../../models/DowntownHistory");
const DowntownRefineHistory_1 = require("../../models/DowntownRefineHistory");
const Activity_1 = require("../../models/Activity");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const PNF = require("google-libphonenumber").PhoneNumberFormat;
const ObjectId = require("mongodb").ObjectId;
const startTime = new Date().getTime();
class DowntownController {
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let sort = [["createdAt", -1]];
                if (req.query.sort) {
                    const map = Array.prototype.map;
                    sort = Object.keys(req.query.sort).map((key) => [
                        key,
                        req.query.sort[key],
                    ]);
                    console.log(sort, "sort");
                }
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    collation: {
                        locale: "en",
                    },
                };
                let filteredQuery = {};
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            file_name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "projectData.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            year: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            type: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            tag: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            "locationData.name": {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                let query = [
                    {
                        $lookup: {
                            from: "locations",
                            localField: "location",
                            foreignField: "_id",
                            as: "locationData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$locationData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "projects",
                            localField: "project_name",
                            foreignField: "_id",
                            as: "projectData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$projectData",
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
                            data: 0,
                        },
                    },
                ];
                var myAggregate = Downtown_1.default.aggregate(query);
                const list = yield Downtown_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewDataonType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let sort = [["createdAt", -1]];
                if (req.query.sort) {
                    const map = Array.prototype.map;
                    sort = Object.keys(req.query.sort).map((key) => [
                        key,
                        req.query.sort[key],
                    ]);
                    console.log(sort, "sort");
                }
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    collation: {
                        locale: "en",
                    },
                };
                let filteredQuery = {
                    downtown_id: ObjectId(req.params.id),
                    is_delete: false,
                };
                const searchNumber = Number(req.query.search);
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            property_number: req.query.search,
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            floor_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            plot_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            mobile_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            country_code: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            phone: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                    if (!isNaN(searchNumber)) {
                        filteredQuery.$or.push({
                            property_number: searchNumber,
                        });
                    }
                    yield Activity_1.default.create({
                        title: `Search Record -- ${req.query.search} `,
                        data: req.query.search,
                        particular_data: req.params.id,
                        data_id: req.params.id,
                        module: "List",
                        action: "Global Search",
                    });
                }
                if (req.query.name && req.query.name.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.property_number && req.query.property_number.trim()) {
                    filteredQuery.$or = [
                        {
                            property_number: req.query.search,
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: 1,
                        },
                    },
                ];
                let list = [];
                console.log(req.params.type, "req.params.type");
                if (req.params.type === "refine" || req.params.type === "Refine") {
                    var myAggregate = DowntownRefineHistory_1.default.aggregate(query);
                    list = yield DowntownRefineHistory_1.default.aggregatePaginate(myAggregate, options);
                }
                else {
                    var myAggregate = DowntownHistory_1.default.aggregate(query);
                    list = yield DowntownHistory_1.default.aggregatePaginate(myAggregate, options);
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", list, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static addDowntownData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { year, location, file_name, project_name, import_file, header_coloum, tag, type, } = req.body;
                const data = {
                    year,
                    location,
                    file_name,
                    project_name,
                    data: import_file.length,
                    header_coloum,
                    tag,
                    type,
                };
                const downtown = yield new Downtown_1.default(data).save();
                import_file.length > 0 &&
                    import_file.map((item) => __awaiter(this, void 0, void 0, function* () {
                        let data = {};
                        const countryCodes = {
                            "1": "United States/Canada",
                            "20": "Egypt",
                            "27": "South Africa",
                            "30": "Greece",
                            "31": "Netherlands",
                            "32": "Belgium",
                            "33": "France",
                            "34": "Spain",
                            "36": "Hungary",
                            "39": "Italy",
                            "40": "Romania",
                            "41": "Switzerland",
                            "43": "Austria",
                            "44": "United Kingdom",
                            "45": "Denmark",
                            "46": "Sweden",
                            "47": "Norway",
                            "48": "Poland",
                            "49": "Germany",
                            "51": "Peru",
                            "52": "Mexico",
                            "53": "Cuba",
                            "54": "Argentina",
                            "55": "Brazil",
                            "56": "Chile",
                            "57": "Colombia",
                            "58": "Venezuela",
                            "60": "Malaysia",
                            "61": "Australia",
                            "62": "Indonesia",
                            "63": "Philippines",
                            "64": "New Zealand",
                            "65": "Singapore",
                            "66": "Thailand",
                            "81": "Japan",
                            "82": "South Korea",
                            "84": "Vietnam",
                            "86": "China",
                            "90": "Turkey",
                            "91": "India",
                            "92": "Pakistan",
                            "93": "Afghanistan",
                            "94": "Sri Lanka",
                            "95": "Myanmar",
                            "98": "Iran",
                            "211": "South Sudan",
                            "212": "Morocco",
                            "213": "Algeria",
                            "216": "Tunisia",
                            "218": "Libya",
                            "220": "Gambia",
                            "221": "Senegal",
                            "222": "Mauritania",
                            "223": "Mali",
                            "224": "Guinea",
                            "225": "Ivory Coast",
                            "226": "Burkina Faso",
                            "227": "Niger",
                            "228": "Togo",
                            "229": "Benin",
                            "230": "Mauritius",
                            "231": "Liberia",
                            "232": "Sierra Leone",
                            "233": "Ghana",
                            "234": "Nigeria",
                            "235": "Chad",
                            "236": "Central African Republic",
                            "237": "Cameroon",
                            "238": "Cape Verde",
                            "239": "São Tomé and Príncipe",
                            "240": "Equatorial Guinea",
                            "241": "Gabon",
                            "242": "Republic of the Congo",
                            "243": "Democratic Republic of the Congo",
                            "244": "Angola",
                            "245": "Guinea-Bissau",
                            "246": "British Indian Ocean Territory",
                            "248": "Seychelles",
                            "249": "Sudan",
                            "250": "Rwanda",
                            "251": "Ethiopia",
                            "252": "Somalia",
                            "253": "Djibouti",
                            "254": "Kenya",
                            "255": "Tanzania",
                            "256": "Uganda",
                            "257": "Burundi",
                            "258": "Mozambique",
                            "260": "Zambia",
                            "261": "Madagascar",
                            "262": "Reunion",
                            "263": "Zimbabwe",
                            "264": "Namibia",
                            "265": "Malawi",
                            "266": "Lesotho",
                            "267": "Botswana",
                            "268": "Eswatini",
                            "269": "Comoros",
                            "290": "Saint Helena",
                            "291": "Eritrea",
                            "297": "Aruba",
                            "298": "Faroe Islands",
                            "299": "Greenland",
                            "350": "Gibraltar",
                            "351": "Portugal",
                            "352": "Luxembourg",
                            "353": "Ireland",
                            "354": "Iceland",
                            "355": "Albania",
                            "356": "Malta",
                            "357": "Cyprus",
                            "358": "Finland",
                            "359": "Bulgaria",
                            "370": "Lithuania",
                            "371": "Latvia",
                            "372": "Estonia",
                            "373": "Moldova",
                            "374": "Armenia",
                            "375": "Belarus",
                            "376": "Andorra",
                            "377": "Monaco",
                            "378": "San Marino",
                            "380": "Ukraine",
                            "381": "Serbia",
                            "382": "Montenegro",
                            "383": "Kosovo",
                            "385": "Croatia",
                            "386": "Slovenia",
                            "387": "Bosnia and Herzegovina",
                            "389": "North Macedonia",
                            "420": "Czech Republic",
                            "421": "Slovakia",
                            "423": "Liechtenstein",
                            "500": "Falkland Islands",
                            "501": "Belize",
                            "502": "Guatemala",
                            "503": "El Salvador",
                            "504": "Honduras",
                            "505": "Nicaragua",
                            "506": "Costa Rica",
                            "507": "Panama",
                            "508": "Saint Pierre and Miquelon",
                            "509": "Haiti",
                            "590": "Guadeloupe",
                            "591": "Bolivia",
                            "592": "Guyana",
                            "593": "Ecuador",
                            "594": "French Guiana",
                            "595": "Paraguay",
                            "596": "Martinique",
                            "597": "Suriname",
                            "598": "Uruguay",
                            "599": "Netherlands Antilles",
                            "670": "East Timor",
                            "672": "Antarctica",
                            "673": "Brunei",
                            "674": "Nauru",
                            "675": "Papua New Guinea",
                            "676": "Tonga",
                            "677": "Solomon Islands",
                            "678": "Vanuatu",
                            "679": "Fiji",
                            "680": "Palau",
                            "681": "Wallis and Futuna",
                            "682": "Cook Islands",
                            "683": "Niue",
                            "685": "Samoa",
                            "686": "Kiribati",
                            "687": "New Caledonia",
                            "688": "Tuvalu",
                            "689": "French Polynesia",
                            "690": "Tokelau",
                            "691": "Micronesia",
                            "692": "Marshall Islands",
                            "850": "North Korea",
                            "852": "Hong Kong",
                            "853": "Macau",
                            "855": "Cambodia",
                            "856": "Laos",
                            "880": "Bangladesh",
                            "886": "Taiwan",
                            "960": "Maldives",
                            "961": "Lebanon",
                            "962": "Jordan",
                            "963": "Syria",
                            "964": "Iraq",
                            "965": "Kuwait",
                            "966": "Saudi Arabia",
                            "967": "Yemen",
                            "968": "Oman",
                            "970": "Palestine",
                            "971": "United Arab Emirates",
                            "972": "Israel",
                            "973": "Bahrain",
                            "974": "Qatar",
                            "975": "Bhutan",
                            "976": "Mongolia",
                            "977": "Nepal",
                            "992": "Tajikistan",
                            "993": "Turkmenistan",
                            "994": "Azerbaijan",
                            "995": "Georgia",
                            "996": "Kyrgyzstan",
                            "998": "Uzbekistan",
                        };
                        let mobileNumber = item["PHONE"]
                            ? item["PHONE"].toString()
                            : item["MOBILE"].toString();
                        mobileNumber = mobileNumber.replace(/\D/g, "");
                        if (mobileNumber.startsWith("00")) {
                            mobileNumber = mobileNumber.slice(2);
                        }
                        if (mobileNumber.length <= 8 || mobileNumber.length > 15) {
                            data.mobile = mobileNumber;
                            data.country_code = "";
                            data.mobile_number = mobileNumber;
                        }
                        else {
                            let countryCode = "";
                            let localNumber = "";
                            for (let i = 1; i <= 4; i++) {
                                const possibleCountryCode = mobileNumber.slice(0, i);
                                if (countryCodes[possibleCountryCode]) {
                                    countryCode = "+" + possibleCountryCode;
                                    localNumber = mobileNumber.slice(i);
                                    break;
                                }
                            }
                            console.log(mobileNumber.startsWith("9714"), "mobileNumber");
                            if (!countryCode) {
                                localNumber = mobileNumber;
                            }
                            const mobileWithoutZero = localNumber;
                            data.mobile = mobileWithoutZero;
                            data.country_code = countryCode;
                            data.mobile_number = mobileWithoutZero;
                            data.phone = item["PHONE"] ? item["PHONE"] : item["MOBILE"];
                        }
                        if (mobileNumber.startsWith("04")) {
                            data.secondary_mobile = data.mobile;
                            data.country_code = "";
                            data.mobile_number = "";
                        }
                        else if (mobileNumber.startsWith("971")) {
                            let localNumberData = mobileNumber.slice(3);
                            console.log(localNumberData, "localNumberData");
                            if (localNumberData.startsWith("04")) {
                                data.secondary_mobile = localNumberData;
                                data.country_code = "";
                                data.mobile_number = "";
                            }
                            else if (localNumberData.startsWith("05")) {
                                data.mobile_number = localNumberData;
                                data.country_code = "+971";
                            }
                            else if (localNumberData.startsWith("4")) {
                                data.secondary_mobile = "0" + localNumberData;
                                data.country_code = "";
                                data.mobile_number = "";
                            }
                            else if (localNumberData.startsWith("5")) {
                                data.mobile_number = "0" + localNumberData;
                                data.country_code = "+971";
                            }
                            else {
                                data.mobile_number = localNumberData;
                                data.country_code = "+971";
                            }
                            // data.country_code = "+971";
                            // data.mobile_number = mobileNumber.slice(3);
                            // data.phone = item["PHONE"];
                            // data.secondary_mobile = item["SECONDARY MOBILE"];
                        }
                        else if (mobileNumber.startsWith("05")) {
                            data.country_code = "+971";
                            data.mobile_number = mobileNumber;
                            data.secondary_mobile = item["SECONDARY MOBILE"];
                            data.phone = item["PHONE"] ? item["PHONE"] : item["MOBILE"];
                        }
                        if (data.mobile_number.length <= 8 ||
                            data.mobile_number.length >= 15) {
                            data.secondary_mobile = data.mobile_number
                                ? data.mobile_number
                                : data.secondary_mobile;
                            data.country_code = "";
                            data.mobile_number = "";
                        }
                        data.property_number = item["P-NUMBER"];
                        data.total_area = item["TOTAL AREA"];
                        data.plot_number = item["PLOT NUMBER"];
                        data.name = item["NAME"];
                        data.area_owned = item["AREA OWNED"];
                        data.address = item["ADDRESS"];
                        data.email = item["EMAIL"];
                        data.mobile = item["MOBILE"];
                        data.flat_number = item["FLAT NUMBER"];
                        data.balcony_area = item["BALCONY AREA"];
                        data.parking_number = item["PARKING NUMBER"];
                        data.common_area = item["COMMON AREA"];
                        data.floor = item["FLOOR"];
                        data.room_description = item["ROOMS DESCRIPTION"];
                        data.actual_area = item["ACTUAL AREA"];
                        data.property_type = item["PROPERTY TYPE"];
                        data.project = item["PROJECT"];
                        data.master_project = item["MASTER PROJECT"];
                        data.municioality_number = item["MUNICIPALITY NUMBER"];
                        data.downtown_id = downtown._id;
                        yield DowntownHistory_1.default.create(data);
                        yield DowntownRefineHistory_1.default.create(data);
                    }));
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Data Successfully", downtown);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static removeDuplicateData(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const downtownId = (_a = req.params.id.split(",")) === null || _a === void 0 ? void 0 : _a.map((id) => ObjectId(id));
            try {
                if (req.params.type == "email") {
                    const duplicates = yield DowntownRefineHistory_1.default.aggregate([
                        {
                            $match: {
                                downtown_id: { $in: downtownId },
                            },
                        },
                        {
                            $group: {
                                _id: "$email",
                                count: { $sum: 1 },
                                ids: { $push: "$_id" },
                            },
                        },
                        {
                            $match: {
                                count: { $gt: 1 },
                            },
                        },
                    ]);
                    const duplicateIds = duplicates.flatMap((group) => group.ids.slice(1));
                    yield DowntownRefineHistory_1.default.updateMany({ _id: { $in: duplicateIds } }, { $set: { is_delete: true } });
                    // await DowntownRefineHistory.updateMany({ _id: { $in: duplicateIds } });
                    const noEmailRecords = yield DowntownRefineHistory_1.default.find({
                        $or: [{ email: { $exists: false } }, { email: "" }, { email: 0 }],
                        downtown_id: { $in: downtownId },
                    });
                    console.log(noEmailRecords, "noEmailRecords");
                    const noEmailIds = noEmailRecords.map((record) => record._id);
                    yield DowntownRefineHistory_1.default.updateMany({ _id: { $in: noEmailIds } }, { $set: { is_delete: true } });
                    // await DowntownRefineHistory.deleteMany({ _id: { $in: noEmailIds } });
                    if (downtownId.length > 0) {
                        yield Activity_1.default.create({
                            data_id: downtownId[0],
                            title: "Remove Duplicate Email",
                            module: "Data",
                            action: "Remove",
                        });
                    }
                    return ResponseHelper_1.default.ok(res, "OK", "Delete Duplicate Data Successfully", {
                        deletedDuplicates: duplicateIds.length,
                        deletedNoEmailRecords: noEmailIds.length,
                    }, new Date().getTime());
                }
                else {
                    const duplicates = yield DowntownRefineHistory_1.default.aggregate([
                        {
                            $match: {
                                downtown_id: { $in: downtownId },
                            },
                        },
                        {
                            $group: {
                                _id: "$phone",
                                count: { $sum: 1 },
                                ids: { $push: "$_id" },
                            },
                        },
                        {
                            $match: {
                                count: { $gt: 1 },
                            },
                        },
                    ]);
                    const duplicateIds = duplicates.flatMap((group) => group.ids.slice(1));
                    yield DowntownRefineHistory_1.default.updateMany({ _id: { $in: duplicateIds } }, { $set: { is_delete: true } });
                    // await DowntownRefineHistory.deleteMany({ _id: { $in: duplicateIds } });
                    const duplicatesD = yield DowntownRefineHistory_1.default.aggregate([
                        {
                            $match: {
                                downtown_id: { $in: downtownId },
                            },
                        },
                        {
                            $group: {
                                _id: "$mobile_number",
                                count: { $sum: 1 },
                                ids: { $push: "$_id" },
                            },
                        },
                        {
                            $match: {
                                count: { $gt: 1 },
                            },
                        },
                    ]);
                    const duplicateIdss = duplicatesD.flatMap((group) => group.ids.slice(1));
                    yield DowntownRefineHistory_1.default.updateMany({ _id: { $in: duplicateIdss } }, { $set: { is_delete: true } });
                    // await DowntownRefineHistory.deleteMany({ _id: { $in: duplicateIdss } });
                    const noEmailRecords = yield DowntownRefineHistory_1.default.find({
                        $or: [
                            { phone: { $exists: false } },
                            { phone: "" },
                            { phone: 0 },
                            { mobile_number: { $exists: false } },
                            { mobile_number: "" },
                            { mobile_number: 0 },
                        ],
                        downtown_id: { $in: downtownId },
                    });
                    console.log(noEmailRecords, "noEmailRecords");
                    const noEmailIds = noEmailRecords.map((record) => record._id);
                    yield DowntownRefineHistory_1.default.updateMany({ _id: { $in: noEmailIds } }, { $set: { is_delete: true } });
                    // await DowntownRefineHistory.deleteMany({ _id: { $in: noEmailIds } });
                    if (downtownId.length > 0) {
                        yield Activity_1.default.create({
                            data_id: downtownId[0],
                            title: "Remove Duplicate Mobile Number",
                            module: "Data",
                            action: "Remove",
                        });
                    }
                    return ResponseHelper_1.default.ok(res, "OK", "Delete Duplicate Data Successfully", {
                        deletedDuplicates: duplicateIds.length,
                        deletedNoEmailRecords: noEmailIds.length,
                    }, new Date().getTime());
                }
                // res.json({
                //   duplicates,
                //   noEmailRecords,
                // });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static listExportRefineData(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const downtownId = (_a = req.params.id.split(",")) === null || _a === void 0 ? void 0 : _a.map((id) => ObjectId(id));
            try {
                const startTime = new Date().getTime();
                let filteredQuery = {
                    downtown_id: { $in: downtownId },
                    is_delete: false,
                };
                const searchNumber = Number(req.query.search);
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            property_number: req.query.search,
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            floor_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            plot_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            mobile_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            country_code: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            phone: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                    if (!isNaN(searchNumber)) {
                        filteredQuery.$or.push({
                            property_number: searchNumber,
                        });
                    }
                    yield Activity_1.default.create({
                        title: `Search Record -- ${req.query.search} `,
                        data: req.query.search,
                        particular_data: req.params.id.split(",")[0],
                        data_id: req.params.id.split(",")[0],
                        module: "List",
                        action: "Global Search",
                    });
                }
                if (req.query.name && req.query.name.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.property_number && req.query.property_number.trim()) {
                    filteredQuery.$or = [
                        {
                            property_number: req.query.search,
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                if (req.query.name && req.query.name.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.property_number && req.query.property_number.trim()) {
                    filteredQuery.$or = [
                        {
                            property_number: req.query.search,
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: 1,
                        },
                    },
                ];
                let list = [];
                list = yield DowntownRefineHistory_1.default.aggregate(query);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", list, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let filteredQuery = {
                    _id: ObjectId(req.params.id),
                };
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: 1,
                        },
                    },
                ];
                let list = [];
                console.log(req.params.type, "req.params.type");
                if (req.params.type === "refine" || req.params.type === "Refine") {
                    list = yield DowntownRefineHistory_1.default.aggregate(query);
                }
                else {
                    list = yield DowntownHistory_1.default.aggregate(query);
                }
                const getActivity = yield Activity_1.default.find({
                    $or: [{ data_id: req.params.id }, { particular_data: req.params.id }],
                });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list.length >= 0 ? list[0] : {}, getActivity }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let downtown = yield DowntownRefineHistory_1.default.findOne({
                    _id: req.params.id,
                });
                console.log(downtown, "downtown");
                // console.log(downtown, "downtown", req.body["property_number"]);
                // downtown.property_number = req.body["property_number"];
                // downtown.total_area = req.body["total_area"] || downtown.total_area;
                // downtown.plot_number = req.body["plot_number"] || downtown.plot_number;
                // downtown.name = req.body["name"] || downtown.name;
                // downtown.area_owned = req.body["area_owned"] || downtown.area_owned;
                // downtown.address = req.body["address"] || downtown.address;
                // downtown.phone = req.body["phone"] || downtown.phone;
                // downtown.mobile_number =
                //   req.body["mobile_number"] || downtown.mobile_number;
                // downtown.country_code = req.body["country_code"] || downtown.country_code;
                // downtown.email = req.body["email"] || downtown.email;
                // downtown.mobile = req.body["mobile"] || downtown.mobile;
                // downtown.flat_number = req.body["flat_number"] || downtown.flat_number;
                // downtown.balcony_area = req.body["balcony_area"] || downtown.balcony_area;
                // downtown.parking_number =
                //   req.body["parking_number"] || downtown.parking_number;
                // downtown.common_area = req.body["common_area"] || downtown.common_area;
                // downtown.floor = req.body["floor"] || downtown.floor;
                // downtown.room_description =
                //   req.body["room_description"] || downtown.room_description;
                // downtown.actual_area = req.body["actual_area"] || downtown.actual_area;
                // downtown.property_type =
                //   req.body["property_type"] || downtown.property_type;
                // downtown.project = req.body["project"] || downtown.project;
                // downtown.master_project =
                //   req.body["master_project"] || downtown.master_project;
                // downtown.municioality_number =
                //   req.body["municioality_number"] || downtown.municioality_number;
                // await downtown.save();
                yield Activity_1.default.create({
                    title: `Update Record`,
                    data: JSON.stringify(req.body),
                    particular_data: req.params.id,
                    data_id: downtown.downtown_id,
                    action: "Update Data",
                    module: "Update Particular Data",
                });
                yield DowntownRefineHistory_1.default.findOneAndUpdate({
                    _id: req.params.id,
                }, { $set: req.body });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Edit Data Successfully", {}, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getActivity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getActivity = yield Activity_1.default.find({
                    $or: [{ data_id: req.params.id }, { particular_data: req.params.id }],
                }).sort({ created_at: -1 });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Activity Data Get Successfully", getActivity, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static undoData(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const downtownId = (_a = req.params.id.split(",")) === null || _a === void 0 ? void 0 : _a.map((id) => ObjectId(id));
            try {
                yield DowntownRefineHistory_1.default.updateMany({ downtown_id: { $in: downtownId } }, { $set: { is_delete: false } });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Undo Data Successfully", {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Downtown_1.default.findOneAndDelete({ _id: req.params.id });
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Delete Data Successfully", {}, startTime);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editFileData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { year, location, file_name, project_name, tag, type } = req.body;
                const data = {
                    year,
                    location,
                    file_name,
                    project_name,
                    tag,
                    type,
                };
                let getData = yield Downtown_1.default.findOne({ _id: req.params.id });
                getData.year = year ? year : getData.year;
                getData.location = location ? location : getData.location;
                getData.file_name = file_name ? file_name : getData.file_name;
                getData.project_name = project_name ? project_name : getData.project_name;
                getData.tag = tag ? tag : getData.tag;
                getData.type = type ? type : getData.type;
                getData.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update Data Successfully", getData, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static viewDataonTypeNew(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                let sort = [["createdAt", -1]];
                if (req.query.sort) {
                    const map = Array.prototype.map;
                    sort = Object.keys(req.query.sort).map((key) => [
                        key,
                        req.query.sort[key],
                    ]);
                    console.log(sort, "sort");
                }
                const options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    collation: {
                        locale: "en",
                    },
                };
                console.log(req.params.id, "req.params.id");
                const downtownId = (_a = req.params.id.split(",")) === null || _a === void 0 ? void 0 : _a.map((id) => ObjectId(id));
                let filteredQuery = {
                    downtown_id: { $in: downtownId },
                    is_delete: false,
                };
                const searchNumber = Number(req.query.search);
                if (req.query.search && req.query.search.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            property_number: req.query.search,
                        },
                        {
                            email: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            floor_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            plot_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            mobile_number: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            country_code: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            phone: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                    if (!isNaN(searchNumber)) {
                        filteredQuery.$or.push({
                            property_number: searchNumber,
                        });
                    }
                    yield Activity_1.default.create({
                        title: `Search Record -- ${req.query.search} `,
                        data: req.query.search,
                        particular_data: req.params.id.split(",")[0],
                        data_id: req.params.id.split(",")[0],
                        module: "List",
                        action: "Global Search",
                    });
                }
                if (req.query.name && req.query.name.trim()) {
                    filteredQuery.$or = [
                        {
                            name: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                    ];
                }
                if (req.query.property_number && req.query.property_number.trim()) {
                    filteredQuery.$or = [
                        {
                            property_number: req.query.search,
                        },
                    ];
                }
                if (req.query.start_date && req.query.end_date) {
                    filteredQuery.createdAt = {
                        $gte: new Date(req.query.start_date),
                        $lte: new Date(req.query.end_date),
                    };
                }
                if (req.query.start_date && req.query.start_date.trim()) {
                    filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
                }
                if (req.query.end_date && req.query.end_date.trim()) {
                    filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
                }
                let query = [
                    {
                        $match: filteredQuery,
                    },
                    {
                        $sort: {
                            created_at: 1,
                        },
                    },
                ];
                let list = [];
                console.log(req.params.type, "req.params.type");
                if (req.params.type === "refine" || req.params.type === "Refine") {
                    var myAggregate = DowntownRefineHistory_1.default.aggregate(query);
                    list = yield DowntownRefineHistory_1.default.aggregatePaginate(myAggregate, options);
                }
                else {
                    var myAggregate = DowntownHistory_1.default.aggregate(query);
                    list = yield DowntownHistory_1.default.aggregatePaginate(myAggregate, options);
                }
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", list, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.DowntownController = DowntownController;
