import express from 'express';
import { CityController } from '../controllers/city.controller';

const cityRouter = express.Router();

cityRouter.route('/getAll').get(
    (req, res) => new CityController().getAll(req, res)
)
cityRouter.route('/getAllRegions').get(
    (req, res) => new CityController().getAllRegions(req, res)
)
cityRouter.route('/getAllMicrolocations').get(
    (req, res) => new CityController().getAllMicrolocations(req, res)
)
cityRouter.route('/getAllCityRegions').post(
    (req, res) => new CityController().getAllCityRegions(req, res)
)
cityRouter.route('/getAllCityRegionMicroLocations').post(
    (req, res) => new CityController().getAllCityRegionMicroLocations(req, res)
)
cityRouter.route('/getCity').post(
    (req, res) => new CityController().getCity(req, res)
)
cityRouter.route('/getCityRegion').post(
    (req, res) => new CityController().getCityRegion(req, res)
)
cityRouter.route('/getMicrolocation').post(
    (req, res) => new CityController().getMicrolocation(req, res)
)

export default cityRouter;