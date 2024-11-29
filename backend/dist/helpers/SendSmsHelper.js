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
exports.sendSMS = void 0;
const twilio = require("twilio");
const sendSMS = (to, body) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = "ACa5144ce5fa5c6376cf0ac82cc91728b6";
    const authToken = "162ee1be86ed4b5057581c2b469fdc8a";
    const twilioNumber = process.env.TWILIO_NUMBER
        ? process.env.TWILIO_NUMBER
        : "+14175453385";
    const client = new twilio(accountSid, authToken);
    console.log(to, "to");
    try {
        const message = yield client.messages.create({
            body: body,
            to: "+" + to,
            from: "+14175453385'",
        });
        console.log("SMS has been sent successfully", message);
        return true;
    }
    catch (error) {
        console.error("Somthing went wrong, Error is", error);
        return false;
    }
});
exports.sendSMS = sendSMS;
