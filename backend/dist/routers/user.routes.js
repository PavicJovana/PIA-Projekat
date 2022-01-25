"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/checkUserData').post((req, res) => new user_controller_1.UserController().checkUserData(req, res));
userRouter.route('/getAllPendingUsers').get((req, res) => new user_controller_1.UserController().getAllPendingUsers(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/approveUser').post((req, res) => new user_controller_1.UserController().approveUser(req, res));
userRouter.route('/rejectUser').post((req, res) => new user_controller_1.UserController().rejectUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map