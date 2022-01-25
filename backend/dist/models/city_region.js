"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let CityRegion = new Schema({
    city_code: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String
    }
});
exports.default = mongoose_1.default.model('CityRegion', CityRegion, 'city_region');
//# sourceMappingURL=city_region.js.map