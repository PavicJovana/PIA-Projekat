"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealestateController = void 0;
const realestate_1 = __importDefault(require("../models/realestate"));
class RealestateController {
    constructor() {
        this.getAll = (req, res) => {
            realestate_1.default.find({}, (err, realestates) => {
                if (err) {
                    console.log("Error getting Realestates in getAll");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(realestates);
            });
        };
        this.getAllAgentsOffers = (req, res) => {
            realestate_1.default.find({ agent: req.body.agent }, (err, realestates) => {
                if (err) {
                    console.log("Error getting Realestates in getAll");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(realestates);
            });
        };
        this.sellRealestate = (req, res) => {
            realestate_1.default.updateOne({ id: req.body.id }, { sold: 1 }).then(relestate => {
                res.status(200).json({ 'message': 'OK', 'success': true });
            }).catch(err => {
                console.log("Error updating Realestate in sellRealestate");
                res.status(401).json({ 'message': "Error", 'success': false });
            });
        };
        this.addRealestate = (req, res) => {
            let realestate = new realestate_1.default(req.body);
            realestate.save().then(realestate => {
                res.status(200).json({ 'message': 'Realestate added', 'success': true });
            }).catch(err => {
                res.status(401).json({ 'message': 'Error!', 'success': false });
            });
        };
    }
}
exports.RealestateController = RealestateController;
//# sourceMappingURL=realestate.controller.js.map