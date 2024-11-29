"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const BookingActivity = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
    },
    title: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: null,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("BookingActivity", BookingActivity);
