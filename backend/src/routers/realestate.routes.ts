import express from 'express';
import { RealestateController } from '../controllers/realestate.controller';

const realestateRouter = express.Router();

realestateRouter.route('/getAll').get(
    (req, res) => new RealestateController().getAll(req, res)
)
realestateRouter.route('/getLastFive').get(
    (req, res) => new RealestateController().getLastFive(req, res)
)
realestateRouter.route('/getOffer').post(
    (req, res) => new RealestateController().getOffer(req, res)
)
realestateRouter.route('/getAllAgentsOffers').post(
    (req, res) => new RealestateController().getAllAgentsOffers(req, res)
)
realestateRouter.route('/getAllMicrolocationType').post(
    (req, res) => new RealestateController().getAllMicrolocationType(req, res)
)
realestateRouter.route('/sellRealestate').post(
    (req, res) => new RealestateController().sellRealestate(req, res)
)
realestateRouter.route('/addRealestate').post(
    (req, res)=> new RealestateController().addRealestate(req, res)
)
realestateRouter.route('/addImage').post(
    (req, res)=> new RealestateController().addImage(req, res)
)

export default realestateRouter; 