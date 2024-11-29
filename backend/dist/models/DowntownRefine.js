"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const DowntownRefine = new Schema({
    file_name: {
        type: String,
        default: null,
    },
    year: {
        type: String,
        default: null,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
    header_coloum: [],
    project_name: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    latitude: {
        type: Number,
        default: 0.0,
    },
    longitude: {
        type: Number,
        default: 0.0,
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
    user_location: {
        type: { type: String },
        coordinates: [Number],
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("DowntownRefine", DowntownRefine);
