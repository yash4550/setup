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
const Firebase_1 = require("../helpers/Firebase");
const User_1 = require("../models/User");
class NotificationService {
    sendNotification(user, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const receiver = yield User_1.default.findById(user);
                if (receiver && receiver.deviceToken) {
                    const message = {
                        notification: {
                            title: title,
                            body: title,
                        },
                        token: receiver.deviceToken,
                    };
                    Firebase_1.default
                        .messaging()
                        .send(message)
                        .then((response) => {
                        console.log("Notification sent successfully : ", response);
                    });
                }
            }
            catch (error) {
                console.log("Error while sending notification : ", error);
                // return error;
            }
        });
    }
}
exports.default = new NotificationService();
