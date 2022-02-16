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
            realestate_1.default.countDocuments({}, (err, realestates) => {
                if (err) {
                    console.log("Error getting number of realestates in addRealestate");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else {
                    let realestate = new realestate_1.default(req.body);
                    realestate.id = realestates + 1;
                    realestate.save().then(realestate => {
                        res.status(200).json({ 'message': 'Realestate added', 'success': true, 'realestate': realestate });
                    }).catch(err => {
                        res.status(401).json({ 'message': 'Error!', 'success': false });
                    });
                }
            });
        };
        this.addImage = (req, res) => {
            let id = req.body.id;
            let image = req.body.image;
            realestate_1.default.findOne({ id: id }, (err, realestate) => {
                if (err) {
                    console.log("Error getting realestate in addImage");
                    res.status(401).json({ 'message': 'Error!', 'success': false });
                }
                else {
                    if (realestate) {
                        realestate_1.default.collection.updateOne({ 'id': parseInt(id) }, { $push: { 'images': image } }).then(realestate => {
                            res.status(200).json({ 'message': 'Realestate image added', 'success': true, 'realestate': realestate });
                        }).catch(err => {
                            res.status(401).json({ 'message': 'Error!', 'success': false });
                        });
                    }
                    else {
                        res.status(401).json({ 'message': 'Error!', 'success': false });
                    }
                }
            });
        };
        this.getAllMicrolocationType = (req, res) => {
            realestate_1.default.find({ type: req.body.type, microlocation: req.body.microlocation, sold: 0 }, (err, realestates) => {
                if (err) {
                    console.log("Error getting Realestates in getAllMicrolocationType");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(realestates);
            });
        };
    }
}
exports.RealestateController = RealestateController;
//# sourceMappingURL=realestate.controller.js.map