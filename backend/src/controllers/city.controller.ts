import express from "express";
import City from "../models/city";

export class CityController {

    getAll = (req: express.Request, res: express.Response) => {
        City.find({}, (err, cities)=>{
            if (err) {
                console.log("Error getting Cities in getAll");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(cities);
        })
    }

}