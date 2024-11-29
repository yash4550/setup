"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const LoyalityPoint = new Schema({
    redemptionRate: {
        type: Number,
        default: 0,
    },
    loyalityPointRedemption: {
        type: Number,
        default: 0,
    },
    conversionRate: {
        type: Number,
        default: 0,
    },
    loyalityPointConversion: {
        type: Number,
        default: 0,
    },
    uniqueId: {
        type: String,
    },
    is_status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("LoyalityPoint", LoyalityPoint);
