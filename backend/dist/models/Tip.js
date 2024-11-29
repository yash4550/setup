"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Tip = new Schema({
    amount: {
        type: Number,
    },
    uniqueId: {
        type: String,
    },
    customerId: { type: Schema.Types.ObjectId, ref: "User" },
    driverId: { type: Schema.Types.ObjectId, ref: "User" },
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
exports.default = (0, mongoose_1.model)("Tip", Tip);
