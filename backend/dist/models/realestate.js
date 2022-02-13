"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Realestate = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    city: {
        type: String
    },
    city_region: {
        type: String
    },
    microlocation: {
        type: String
    },
    street: {
        type: String
    },
    size: {
        type: Number
    },
    rooms: {
        type: Number
    },
    construction_year: {
        type: Number
    },
    state: {
        type: String
    },
    heating: {
        type: String
    },
    floor: {
        type: String
    },
    total_floors: {
        type: Number
    },
    parking: {
        type: Number
    },
    monthly_utilities: {
        type: Number
    },
    price: {
        type: Number
    },
    about: {
        type: String
    },
    characteristics: {
        type: Array
    },
    type: {
        type: String
    },
    agent: {
        type: String
    },
    sold: {
        type: Number
    },
    images: {
        type: Array
    },
});
exports.default = mongoose_1.default.model('Realestate', Realestate, 'realestate');
//# sourceMappingURL=realestate.js.map