"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Product = new Schema({
    name: {
        type: String,
        default: null,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    price: {
        type: Number,
        default: null,
    },
    discountPrice: {
        type: Number,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    image: [],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Product", Product);
