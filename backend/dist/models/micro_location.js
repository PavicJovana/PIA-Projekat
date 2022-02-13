"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MicroLocation = new Schema({
    city_region: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String
    }
});
exports.default = mongoose_1.default.model('MicroLocation', MicroLocation, 'micro_location');
//# sourceMappingURL=micro_location.js.map