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
exports.HotelRidesController = void 0;
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const Rides_1 = require("../../models/Rides");
const ObjectId = require("mongodb").ObjectId;
class HotelRidesController {
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
                            customerName: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            customerPhoneNumber: {
                                $regex: new RegExp(req.query.search),
                                $options: "i",
                            },
                        },
                        {
                            customerCountryCode: {
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
                if (req.query.id) {
                    filteredQuery["hotel._id"] = ObjectId(req.query.id);
                }
                let query = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "hotel",
                            foreignField: "_id",
                            as: "hotel",
                        },
                    },
                    {
                        $unwind: {
                            path: "$hotel",
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
                var myAggregate = Rides_1.default.aggregate(query);
                const list = yield Rides_1.default.aggregatePaginate(myAggregate, options);
                return ResponseHelper_1.default.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { customerName, customerPhoneNumber, customerCountryCode, pickupAddress, destinationAddress, hotel, paymentType, rideTypes, } = req.body;
                const data = {
                    customerName,
                    customerPhoneNumber,
                    customerCountryCode,
                    pickupAddress,
                    destinationAddress,
                    hotel,
                    paymentType,
                    rideTypes,
                };
                yield new Rides_1.default(data).save();
                return ResponseHelper_1.default.created(res, "SUCCESS", "Add Rides Successfully", data);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startTime = new Date().getTime();
                const { customerName, customerPhoneNumber, customerCountryCode, pickupAddress, destinationAddress, hotel, paymentType, rideTypes, } = req.body;
                const id = req.params.id;
                const getData = yield Rides_1.default.findOne({ _id: id });
                console.log(getData);
                if (!getData)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Rides not found", getData, startTime);
                (getData.customerName = customerName
                    ? customerName
                    : getData.customerName),
                    (getData.customerPhoneNumber = customerPhoneNumber
                        ? customerPhoneNumber
                        : getData.customerPhoneNumber),
                    (getData.customerCountryCode = customerCountryCode
                        ? customerCountryCode
                        : getData.customerCountryCode),
                    (getData.pickupAddress = pickupAddress
                        ? pickupAddress
                        : getData.pickupAddress),
                    (getData.destinationAddress = destinationAddress
                        ? destinationAddress
                        : getData.destinationAddress),
                    (getData.hotel = hotel ? hotel : getData.hotel),
                    (getData.paymentType = paymentType ? paymentType : getData.paymentType),
                    (getData.rideTypes = rideTypes ? rideTypes : getData.rideTypes),
                    getData.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Update data Successfully", getData, startTime);
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
                const getData = yield Rides_1.default.findOne({
                    _id: req.params.id,
                });
                if (!getData)
                    return ResponseHelper_1.default.notFound(res, "NOTFOUND", "Rides not found", getData, startTime);
                (getData.is_status = !getData.is_status), getData.save();
                return ResponseHelper_1.default.ok(res, "SUCCESS", "Status Change Successfully", getData, startTime);
                // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.HotelRidesController = HotelRidesController;
