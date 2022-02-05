import express from 'express';
import { RealestateController } from '../controllers/realestate.controller';

const realestateRouter = express.Router();

realestateRouter.route('/getAll').get(
    (req, res) => new RealestateController().getAll(req, res)
)
realestateRouter.route('/getAllAgentsOffers').post(
    (req, res) => new RealestateController().getAllAgentsOffers(req, res)
)
realestateRouter.route('/sellRealestate').post(
    (req, res) => new RealestateController().sellRealestate(req, res)
)
realestateRouter.route('/addRealestate').post(
    (req, res)=> new RealestateController().addRealestate(req, res)
)

export default realestateRouter; 