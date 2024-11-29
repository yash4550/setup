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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Location_1 = require("../../models/Location");
class LocationController {
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
                    console.log(req.query.search, "req.query.search");
                    // filteredQuery = {
                    //   name: {
                    //     $regex: req.query.search,
                    //     $options: "$i",
                    //   },
                    // };
                    filteredQuery.$or = [
                        {
                            title: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            message: {
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
                            from: "countries",
                            localField: "country",
                            foreignField: "id",
                            as: "countryData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$countryData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "states",
                            localField: "state",
                            foreignField: "id",
                            as: "stateData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$stateData",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "cities",
                            localField: "city",
                            foreignField: "id",
                            as: "cityData",
                        },
                    },
                    {
                        $unwind: {
                            path: "$cityData",
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
                ];
                var myAggregate = Location_1.default.aggregate(query);
                const list = yield Location_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "list", list, new Date().getTime());
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { country, city, state, name } = req.body;
                const getLocation = yield Location_1.default.findOne({
                    country,
                    city,
                    state,
                    name,
                });
                if (getLocation) {
                    return ResponseHelper_1.default.conflict(res, "CONFLICT", "Location is already added", {}, new Date().getTime());
                }
                const data = {
                    country,
                    city,
                    state,
                    name,
                };
                const location = yield new Location_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Location Successfully", location);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { country, city, state, name } = req.body;
                const id = req.params.id;
                const getLocation = yield Location_1.default.findOne({ _id: id });
                console.log(getLocation);
                if (!getLocation)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Location not found", getLocation, startTime);
                (getLocation.country = country ? country : getLocation.country),
                    (getLocation.state = state ? state : getLocation.state),
                    (getLocation.city = city ? city : getLocation.city),
                    (getLocation.name = name ? name : getLocation.name),
                    getLocation.save();
                // const user = await new User(data).save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getLocation, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = LocationController;
