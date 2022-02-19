"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realestate_controller_1 = require("../controllers/realestate.controller");
const realestateRouter = express_1.default.Router();
realestateRouter.route('/getAll').get((req, res) => new realestate_controller_1.RealestateController().getAll(req, res));
realestateRouter.route('/getLastFive').get((req, res) => new realestate_controller_1.RealestateController().getLastFive(req, res));
realestateRouter.route('/getOffer').post((req, res) => new realestate_controller_1.RealestateController().getOffer(req, res));
realestateRouter.route('/getAllAgentsOffers').post((req, res) => new realestate_controller_1.RealestateController().getAllAgentsOffers(req, res));
realestateRouter.route('/getAllMicrolocationType').post((req, res) => new realestate_controller_1.RealestateController().getAllMicrolocationType(req, res));
realestateRouter.route('/sellRealestate').post((req, res) => new realestate_controller_1.RealestateController().sellRealestate(req, res));
realestateRouter.route('/addRealestate').post((req, res) => new realestate_controller_1.RealestateController().addRealestate(req, res));
realestateRouter.route('/addImage').post((req, res) => new realestate_controller_1.RealestateController().addImage(req, res));
exports.default = realestateRouter;
//# sourceMappingURL=realestate.routes.js.map