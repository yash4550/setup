"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Activity = new Schema({
    title: {
        type: String,
    },
    module: {
        type: String,
    },
    data: {
        type: String,
    },
    action: { type: String },
    data_id: {
        type: Schema.Types.ObjectId,
        ref: "Downtown",
    },
    particular_data: {
        type: Schema.Types.ObjectId,
        ref: "DowntownRefineHistory",
    },
    is_status: {
        type: Boolean,
        default: true,
    },
    is_deleted: {
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
exports.default = (0, mongoose_1.model)("Activity", Activity);
