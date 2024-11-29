"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const DowntownHistory = new Schema({
    downtown_id: {
        type: Schema.Types.ObjectId,
        ref: "Downtown",
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    strict: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("DowntownHistory", DowntownHistory);
