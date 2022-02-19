import express from "express";
import city_region from "../models/city_region";
import City from "../models/city";
import micro_location from "../models/micro_location";

export class CityController {

    getAll = (req: express.Request, res: express.Response) => {
        City.find({}, (err, cities)=>{
            if (err) {
                console.log("Error getting Cities in getAll");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(cities);
        })
    }

    getAllRegions =  (req: express.Request, res: express.Response) => {
        city_region.find({}, (err, regions)=>{
            if (err) {
                console.log("Error getting Regions in getAllRegions");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(regions);
        })
    }

    getAllMicrolocations =  (req: express.Request, res: express.Response) => {
        micro_location.find({}, (err, microlocations)=>{
            if (err) {
                console.log("Error getting Regions in getAllRegions");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(microlocations);
        })
    }

    getAllCityRegions =  (req: express.Request, res: express.Response) => {
        city_region.find({city: req.body.city}, (err, regions)=>{
            if (err) {
                console.log("Error getting Regions in getAllCityRegions");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(regions);
        })
    }

    getAllCityRegionMicroLocations =  (req: express.Request, res: express.Response) => {
        micro_location.find({city_region: req.body.city_region}, (err, micro_locations)=>{
            if (err) {
                console.log("Error getting Regions in getAllCityRegions");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(micro_locations);
        })
    }

    getCity = (req: express.Request, res: express.Response) => {
        City.findOne({code: req.body.code}, (err, city)=>{
            if (err) {
                console.log("Error getting City in getCity");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(city);
        })
    }

    getCityRegion = (req: express.Request, res: express.Response) => {
        city_region.findOne({code: req.body.code}, (err, city_region)=>{
            if (err) {
                console.log("Error getting CityRegion in getCityRegion");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(city_region);
        })
    }

    getMicrolocation = (req: express.Request, res: express.Response) => {
        micro_location.findOne({code: req.body.code}, (err, micro)=>{
            if (err) {
                console.log("Error getting Microlocatiion in getMicrolocation");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(micro);
        })
    }

}