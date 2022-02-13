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
        Realestate.countDocuments({}, (err, realestates)=>{
            if (err) {
                console.log("Error getting number of realestates in addRealestate");
                res.status(401).json({'message': 'Error!'});
            } else {
                let realestate = new Realestate(req.body);
                realestate.id = realestates + 1;
        
                realestate.save().then(realestate=>{
                    res.status(200).json({'message': 'Realestate added', 'success': true, 'realestate': realestate})
                }).catch(err=>{
                    res.status(401).json({'message': 'Error!', 'success': false})
                });
            }
        });
    }

    addImage = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let image = req.body.image;

        Realestate.findOne({id: id}, (err, realestate)=>{
            if(err) {
                console.log("Error getting realestate in addImage");
                res.status(401).json({'message': 'Error!', 'success': false});
            } else {
                if (realestate) {
                    Realestate.collection.updateOne({'id': parseInt(id)}, {$push: {'images': image}}).then(realestate => {
                        res.status(200).json({'message': 'Realestate image added', 'success': true, 'realestate': realestate})
                    }).catch(err=>{
                        res.status(401).json({'message': 'Error!', 'success': false})
                    });
                } else {
                    res.status(401).json({'message': 'Error!', 'success': false});
                }
            }
        })

    }
}