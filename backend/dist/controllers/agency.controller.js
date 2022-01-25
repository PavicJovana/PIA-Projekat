"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.checkAgencyTaken = (req, res) => {
            let pib = req.body.pib;
            agency_1.default.findOne({ pib: pib }, (err, agency) => {
                if (err) {
                    console.log("Error getting Agency in checkAgencyTaken");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else {
                    if (agency)
                        res.status(200).json({ 'pibTaken': true });
                    else
                        res.status(200).json({ 'pibTaken': false });
                }
            });
        };
        this.addAgency = (req, res) => {
            let agency = new agency_1.default(req.body);
            agency.save().then(user => {
                res.status(200).json({ 'message': 'Agency added', 'success': true });
            }).catch(err => {
                res.status(401).json({ 'message': 'Error!', 'success': false });
            });
        };
        this.getAll = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err) {
                    console.log("Error getting Agencies in getAll");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(agencies);
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map