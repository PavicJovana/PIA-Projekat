import express from "express";
import realestate from "../models/realestate";
import Realestate from "../models/realestate";

export class RealestateController {

    getAll = (req: express.Request, res: express.Response) => {
        Realestate.find({}, (err, realestates)=>{
            if (err) {
                console.log("Error getting Realestates in getAll");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(realestates);
        })
    }

    getAllAgentsOffers = (req: express.Request, res: express.Response) => {
        Realestate.find({agent: req.body.agent}, (err, realestates)=>{
            if (err) {
                console.log("Error getting Realestates in getAll");
                res.status(401).json({'message': 'Error!'});
            } else res.status(200).json(realestates);
        })
    }

    sellRealestate = (req: express.Request, res: express.Response) => {
        Realestate.updateOne({id: req.body.id}, {sold: 1}).then(relestate => {
            res.status(200).json({'message': 'OK', 'success': true});
        }).catch(err => {
            console.log("Error updating Realestate in sellRealestate");
            res.status(401).json({'message': "Error", 'success': false});
        })
    }

    addRealestate = (req: express.Request, res: express.Response)=>{
        let realestate = new Realestate(req.body);

        realestate.save().then(realestate=>{
            res.status(200).json({'message': 'Realestate added', 'success': true})
        }).catch(err=>{
            res.status(401).json({'message': 'Error!', 'success': false})
        });
    }
}