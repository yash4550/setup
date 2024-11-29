"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../push.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});
exports.default = firebaseAdmin;
