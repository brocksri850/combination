import { Router } from "express";
import { routerResponse } from "../common/responseQuery";
import combinationService from "../services/combinationService";

export class CombinationRouter {
    public router;
    constructor() {
        this.router = Router();
        this.init()
    }
    init() {
        this.router.post("/createcombination", this.combinationOfEachArray);
        this.router.get("/getone", this.getOneCombination)
        this.router.get("/getall", this.getAllCombination);
        this.router.put("/update", this.updateCombinationId);
        this.router.delete("/delete", this.deleteCombinationId)
    }

    public combinationOfEachArray(req: any, res: any) {
        try {
            combinationService.combinationOfEachArray(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public getOneCombination(req: any, res: any) {
        try {
            combinationService.getOneCombination(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public getAllCombination(req: any, res: any) {
        try {
            combinationService.getAllCombination(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }
    public updateCombinationId(req: any, res: any) {
        try {
            combinationService.updateCombinationId(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }
    public deleteCombinationId(req: any, res: any) {
        try {
            combinationService.deleteCombinationId(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

}
var combinationRouter = new CombinationRouter();
const router = combinationRouter.router
export default router