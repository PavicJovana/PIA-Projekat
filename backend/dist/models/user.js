"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    city: {
        type: String
    },
    birthday: {
        type: Date
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    agency: {
        type: String
    },
    licence_number: {
        type: String
    },
    type: {
        //0 - admin
        //1 - oglasivac
        //2 - kupac
        type: Number
    },
    status: {
        //0 - odbijen
        //1 - prihvacen
        //2 - na cekanju
        type: Number
    },
    image: {
        type: String
    }
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map