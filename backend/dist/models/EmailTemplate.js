"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const EmailTemplate = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    is_status: {
        type: Boolean,
        default: true,
    },
    subject: {
        type: String,
    },
    body: {
        type: String,
    },
}, { timestamps: true });
function deviceLimit(val) {
    if (val.length > 4) {
        this.deviceInfo.shift();
    }
    return true;
}
mongoose.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("EmailTemplate", EmailTemplate);
