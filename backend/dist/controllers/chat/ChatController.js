"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const mongoose = require("mongoose");
const SocketService_1 = require("../../services/SocketService");
const Chat_1 = require("../../models/Chat");
const User_1 = require("../../models/User");
class ChatController {
    static sendMessage(data, callback, socket, io) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiverId = data.receiverId;
            let messageData = {
                sender_id: data.senderId || null,
                receiver_id: data.receiverId || null,
                booking_id: data.bookingId || null,
                message: data.message,
                type: data.type || "text",
                url: data.url || null,
            };
            let chatMessage = yield new Chat_1.default(messageData).save();
            let lastChat = yield Chat_1.default.findById(chatMessage._id).populate([
                { path: "sender_id" },
                { path: "receiver_id" },
            ]);
            const memberSocket = SocketService_1.default.sockets[receiverId] || null;
            if (memberSocket) {
                memberSocket.emit("receiveMessage", {
                    status: 201,
                    message: "Message has been sent successfully.",
                    data: lastChat,
                });
            }
            callback({ status: 201, message: "Message sent.", data: lastChat });
        });
    }
    static chatHistory(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    page: data.page || 1,
                    limit: 10,
                };
                let query = [
                    {
                        $match: {
                            $or: [
                                {
                                    sender_id: new mongoose.Types.ObjectId(data.senderId.toString()),
                                    receiver_id: new mongoose.Types.ObjectId(data.receiverId.toString()),
                                    booking_id: new mongoose.Types.ObjectId(data.bookingId.toString()),
                                },
                                {
                                    sender_id: new mongoose.Types.ObjectId(data.receiverId.toString()),
                                    receiver_id: new mongoose.Types.ObjectId(data.senderId.toString()),
                                    booking_id: new mongoose.Types.ObjectId(data.bookingId.toString()),
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "sender_id",
                            foreignField: "_id",
                            as: "sender_id",
                        },
                    },
                    {
                        $unwind: {
                            path: "$sender_id",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "receiver_id",
                            foreignField: "_id",
                            as: "receiver_id",
                        },
                    },
                    {
                        $unwind: {
                            path: "$receiver_id",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $sort: {
                            created_at: -1,
                        },
                    },
                ];
                const myAggregate = Chat_1.default.aggregate(query);
                const chatList = yield Chat_1.default.aggregatePaginate(myAggregate, options);
                callback({
                    status: 200,
                    message: "Chat get successfully.",
                    data: chatList,
                });
            }
            catch (e) {
                callback({
                    status: 500,
                    message: "Intenal server error.",
                    data: e._message,
                });
            }
        });
    }
    static readMessage(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chat = yield Chat_1.default.findById(data.chat_id);
                chat.is_read = true;
                chat.save();
                callback({
                    status: 200,
                    message: "Message readed successfully.",
                    data: chat,
                });
            }
            catch (e) {
                callback({
                    status: 500,
                    message: "Intenal server error.",
                    data: e._message,
                });
            }
        });
    }
    static chatList(data, callback, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = data.limit || 10;
                const options = {
                    page: data.page || 1,
                    limit: 3,
                    collation: {
                        locale: "en",
                    },
                    lean: true,
                    sort: {
                        created_at: -1,
                    },
                };
                let query = [
                    {
                        $match: {
                            type: { $in: ["Specialist", "Dealer"] },
                            is_active: true,
                            is_verify: true,
                            is_deleted: false,
                            _id: { $ne: data.senderId },
                        },
                    },
                ];
                const myAggregate = User_1.default.aggregate(query);
                const userList = yield User_1.default.aggregatePaginate(myAggregate, options);
                callback({
                    status: 200,
                    message: "Chat list get successfully.",
                    data: userList,
                });
            }
            catch (e) {
                callback({
                    status: 500,
                    message: "Intenal server error.",
                    data: e._message,
                });
            }
        });
    }
}
exports.ChatController = ChatController;
