"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityController = void 0;
const city_region_1 = __importDefault(require("../models/city_region"));
const city_1 = __importDefault(require("../models/city"));
const micro_location_1 = __importDefault(require("../models/micro_location"));
class CityController {
    constructor() {
        this.getAll = (req, res) => {
            city_1.default.find({}, (err, cities) => {
                if (err) {
                    console.log("Error getting Cities in getAll");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(cities);
            });
        };
        this.getAllRegions = (req, res) => {
            city_region_1.default.find({}, (err, regions) => {
                if (err) {
                    console.log("Error getting Regions in getAllRegions");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(regions);
            });
        };
        this.getAllMicrolocations = (req, res) => {
            micro_location_1.default.find({}, (err, microlocations) => {
                if (err) {
                    console.log("Error getting Regions in getAllRegions");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(microlocations);
            });
        };
        this.getAllCityRegions = (req, res) => {
            city_region_1.default.find({ city: req.body.city }, (err, regions) => {
                if (err) {
                    console.log("Error getting Regions in getAllCityRegions");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(regions);
            });
        };
        this.getAllCityRegionMicroLocations = (req, res) => {
            micro_location_1.default.find({ city_region: req.body.city_region }, (err, micro_locations) => {
                if (err) {
                    console.log("Error getting Regions in getAllCityRegions");
                    res.status(401).json({ 'message': 'Error!' });
                }
                else
                    res.status(200).json(micro_locations);
            });
        };
    }
}
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map