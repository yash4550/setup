"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const ChatParticipant = new Schema({
    first_participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    second_participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        default: null,
    },
    time_stamp: {
        type: String,
        default: Math.round(new Date().getTime()),
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
ChatParticipant.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("ChatParticipant", ChatParticipant);
