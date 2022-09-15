import { commonService } from "./commonService";
import { models } from "../models/model";

class CombinationService {

    constructor() { }

    public combinationOfEachArray(req: any, callback: Function) {
        var data = req.body;
        var reqArray: any = [];

        //This only two array  can get a combination

        // data.color.forEach(element => data.size.map(element1 => {
        //     var reqJson: any = {
        //         color: element,
        //         size: element1
        //     }
        //     reqArray.push(reqJson)
        // }))

        // this is dynamically get an combination for multiple arrays
        const combinationArray = (key, dataArray, resArray) => {
            var reqArray: any = [];

            const iterateValues = (element = {}) => {
                let result: any = [];
                dataArray.map(element1 => {
                    var reqJson: any = {
                        ...element,
                        [key]: element1
                    }
                    result.push(reqJson)
                });
                return result
            }

            if (resArray.length > 0) {
                resArray.forEach(element =>
                    reqArray = [...reqArray, ...iterateValues(element)]
                )
            }
            else {
                reqArray = iterateValues();
            }
            return reqArray;
        }

        let resArray = [];
        Object.keys(data).forEach(key => {
            resArray = combinationArray(key, data[key], resArray)
        })

        commonService.bulkCreate(resArray, models.Combination, function (err: Error, response: any) {
            callback(err, response)
        })
    }

    public getAllCombination(req: any, callback: Function) {
        var condition: any = {
            where: {}
        }
        commonService.findAll(condition, models.Combination, function (err: Error, response: any) {
            callback(err, response);
        })
    }

    public updateCombinationId(req: any, callback: Function) {
        var query = req.query;
        var data = req.body;
        var condition: any = {
            where: {
                combination_id: query.combination_id
            }
        }
        commonService.update(data, condition, models.Combination, function (err: Error, response: any) {
            callback(err, response);
        })
    }

    public deleteCombinationId(req: any, callback) {
        var query = req.query;
        var condition: any = {
            where: {
                combination_id: query.combination_id
            }
        }
        commonService.destroy(condition, models.Combination, function (err: Error, response: any) {
            callback(err, {message: "Data deleted"});
        })
    }

    public getOneCombination(req: any, callback: Function) {
        var query = req.query;
        var condition: any = {
            where: {
                combination_id: query.combination_id
            }
        }
        commonService.findOne(condition, models.Combination, function (err: Error, response: any) {
            callback(err, response);
        })
    }

}

var combinationService = new CombinationService();
export default combinationService;