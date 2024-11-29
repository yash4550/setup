"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const CarType = new Schema({
    name: {
        type: String,
    },
    uniqueId: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
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
exports.default = (0, mongoose_1.model)("CarType", CarType);
