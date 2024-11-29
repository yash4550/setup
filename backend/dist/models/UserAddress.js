"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const UserAddress = new Schema({
    address: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    type: {
        type: String,
        enum: ["Pickup", "Destination"],
        default: "Pickup",
    },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    landmark: { type: String, default: null },
    house_no: { type: String, default: null },
    street: { type: String, default: null },
    floor: { type: String, default: null },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    addressType: {
        type: String,
        default: "Home",
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
UserAddress.index({ location: "2dsphere" });
exports.default = (0, mongoose_1.model)("UserAddress", UserAddress);
