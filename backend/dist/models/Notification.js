"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Notification = new Schema({
    title: {
        type: String,
    },
    notificationtype: {
        type: String,
    },
    message: {
        type: String,
    },
    type: {
        type: String,
        enum: ["User", "Driver", "All", "Hotel"],
        default: "All",
    },
    image: {
        type: String,
        default: null,
    },
    allUser: {
        type: Boolean,
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Notification", Notification);
