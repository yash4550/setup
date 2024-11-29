"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const ContentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    is_status: {
        type: Boolean,
        default: true,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    l_description: {
        type: String,
    },
}, { timestamps: true });
function deviceLimit(val) {
    if (val.length > 4) {
        this.deviceInfo.shift();
    }
    return true;
}
ContentSchema.plugin(aggregatePaginate);
const Content = (0, mongoose_1.model)("Content", ContentSchema);
exports.default = Content;
