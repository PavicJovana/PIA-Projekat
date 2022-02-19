import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/addAgency').post(
    (req, res)=> new AgencyController().addAgency(req, res)
)
agencyRouter.route('/checkAgencyTaken').post(
    (req, res) => new AgencyController().checkAgencyTaken(req, res)
)
agencyRouter.route('/getAll').get(
    (req, res) => new AgencyController().getAll(req, res)
)
agencyRouter.route('/getAgency').post(
    (req, res) => new AgencyController().getAgency(req, res)
)

export default agencyRouter; 