import express from "express";
import Agency from "../models/agency";

export class AgencyController {

    checkAgencyTaken = (req: express.Request, res:express.Response) => {
        let pib = req.body.pib;

        Agency.findOne({pib: pib}, (err, agency)=>{
            if (err) {
                console.log("Error getting Agency in checkAgencyTaken");
                res.status(401).json({'message': 'Error!'});
            } else {
                if (agency) res.status(200).json({'pibTaken': true});
                else res.status(200).json({'pibTaken': false});
            }
        })
    }

    addAgency = (req: express.Request, res: express.Response)=>{
        let agency = new Agency(req.body);

        agency.save().then(user=>{
            res.status(200).json({'message': 'Agency added', 'success': true})
        }).catch(err=>{
            res.status(401).json({'message': 'Error!', 'success': false})
        });
    }

    getAll = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, agencies)=>{
            if (err) {
                console.log("Error getting Agencies in getAll");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(agencies);
        })
    }

}