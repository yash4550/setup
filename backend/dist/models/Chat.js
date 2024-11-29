"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Chat = new Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    message: {
        type: String,
        default: null,
    },
    url: {
        type: String,
        default: null,
    },
    message_type: {
        type: String,
        enum: ["TEXT", "IMAGE", "VIDEO", "AUDIO"],
        default: "TEXT",
    },
    read_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    is_read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
// Chat.plugin(mongoosePaginate);
// export default model("Chat", Chat);
Chat.plugin(aggregatePaginate);
exports.default = (0, mongoose_1.model)("Chat", Chat);
