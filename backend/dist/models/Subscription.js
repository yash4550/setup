"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Subscription = new Schema({
    language: {
        type: String,
    },
    productId: {
        type: String,
    },
    validMonth: {
        type: String,
    },
    cancellationDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    session: {
        type: Number,
        default: 0,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    month: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    benefits: {
        type: String,
        default: 0,
    },
    type: {
        type: String,
        enum: ["Healing Month", "Quarterly Calm", "Semi-Annual Serenity"],
        default: "Healing Month",
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Subscription", Subscription);
