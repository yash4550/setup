"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageStrings = void 0;
// language.ts
const fs = require("fs");
const path = require("path");
const DEFAULT_LANGUAGE = "en";
function loadLanguageFile(language) {
    const filePath = path.join(__dirname, "../..", `locale/en.json`);
    const defaultPath = path.join(__dirname, "../..", `locale/en.json`);
    console.log(filePath, filePath);
    const data = fs.readFileSync(filePath ? filePath : defaultPath, "utf-8");
    return JSON.parse(data);
}
function getLanguageStrings(language) {
    if (!language) {
        return loadLanguageFile(DEFAULT_LANGUAGE);
    }
    try {
        return loadLanguageFile(language);
    }
    catch (e) {
        console.warn(`Failed to load language file for language "${language}", using default language.`);
        return loadLanguageFile(DEFAULT_LANGUAGE);
    }
}
exports.getLanguageStrings = getLanguageStrings;
