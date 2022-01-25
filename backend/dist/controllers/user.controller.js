"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            user_1.default.findOne(req.body, (err, user) => {
                if (err) {
                    console.log("Error getting User in login");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(user);
            });
        };
        this.register = (req, res) => {
            let userData = req.body;
            userData.birthday = new Date(userData.birthday);
            let user = new user_1.default(userData);
            user.save().then(user => {
                res.status(200).json({ 'message': 'User created', 'success': true });
            }).catch(err => {
                res.status(401).json({ 'message': 'Error!', 'success': false });
            });
        };
        this.checkUserData = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let licence_number = req.body.licence_number;
            let usernameTaken = false;
            let emailTaken = false;
            let licenceNumberTaken = false;
            user_1.default.findOne({ username: username }, (err, user) => {
                if (err) {
                    console.log("Error getting User in checkUsernameAndEmail");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else {
                    if (user)
                        usernameTaken = true;
                    user_1.default.findOne({ email: email }, (err, user) => {
                        if (err) {
                            console.log("Error getting User in checkUsernameAndEmail");
                            res.status(401).json({ 'message': 'Error!' });
                        }
                        else {
                            if (user)
                                emailTaken = true;
                            if (licence_number) {
                                user_1.default.findOne({ licence_number: licence_number }, (err, user) => {
                                    if (err) {
                                        console.log("Error getting User in checkUsernameAndEmail");
                                        res.status(401).json({ 'message': 'Error!' });
                                    }
                                    else {
                                        if (user)
                                            licenceNumberTaken = true;
                                        res.status(200).json({ 'usernameTaken': usernameTaken, 'emailTaken': emailTaken, 'licenceNumberTaken': licenceNumberTaken });
                                    }
                                });
                            }
                            else
                                res.status(200).json({ 'usernameTaken': usernameTaken, 'emailTaken': emailTaken, 'licenceNumberTaken': licenceNumberTaken });
                        }
                    });
                }
            });
        };
        this.getAllPendingUsers = (req, res) => {
            user_1.default.find({ status: 2 }, (err, users) => {
                if (err) {
                    console.log("Error getting User in getAllPendingUsers");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(users);
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err) {
                    console.log("Error getting User in getAllPendingUsers");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(users);
            });
        };
        this.approveUser = (req, res) => {
            user_1.default.updateOne({ username: req.body.username }, { status: 1 }).then(news => {
                res.status(200).json({ 'message': 'OK', 'success': true });
            }).catch(err => {
                console.log("Error updating User in approveUser");
                res.status(401).json({ 'message': "Error", 'success': false });
                ;
            });
        };
        this.rejectUser = (req, res) => {
            user_1.default.updateOne({ username: req.body.username }, { status: 0 }).then(news => {
                res.status(200).json({ 'message': 'OK', 'success': true });
            }).catch(err => {
                console.log("Error updating User in rejectUser");
                res.status(401).json({ 'message': "Error", 'success': false });
                ;
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map