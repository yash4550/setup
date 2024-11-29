"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Rating = new Schema({
    booking_id: { type: Schema.Types.ObjectId, ref: "Booking" },
    Ride_id: { type: Schema.Types.ObjectId, ref: "Rides" },
    from_user: { type: Schema.Types.ObjectId, ref: "User" },
    to_user: { type: Schema.Types.ObjectId, ref: "User" },
    rating_type: {
        type: String,
        enum: ["User", "Hotel", "Goverment", "Driver"],
    },
    rating: Number,
    description: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
// Rides.index({ pickupLocation: "2dsphere" });
// Rides.index({ dropLocation: "2dsphere" });
exports.default = (0, mongoose_1.model)("Rating", Rating);
