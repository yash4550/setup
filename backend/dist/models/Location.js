"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Location = new Schema({
    name: {
        type: String,
        default: null,
    },
    country: {
        type: Number,
        default: null,
    },
    state: {
        type: Number,
        default: null,
    },
    city: {
        type: Number,
        default: null,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Location", Location);
