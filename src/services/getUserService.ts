import { models } from "../models/model";
import commonService from "./commonService";
import * as _ from "lodash";
import { routerResponse } from "../common/responseQuery";
const { Op } = require("sequelize");
import * as async from "async";

class GetUserService {

    constructor() { }

    public getByUser(req: any, callback: Function) {

        var query = req.query;
        var condition: any = {
            where: {
                user_id: query.user_id
            },
            attributes: ['user_id', 'first_name', 'last_name', 'user_name', 'email', 'phone_number', 'country_code']
        }
        condition.include = [
            { model: models.EducationQualification },
            { model: models.WorkExperience },
        ]
        commonService.findOne(condition, models.User, function (err: Error, response: any) {
            callback(err, response)
        })
    }

    public getAllUsers(req: any, callback: Function) {
        var query = req.query;

        var condition = routerResponse.getPagenationQuery(query);

        condition = {
            where: {},
            attributes: ['user_id', 'first_name', 'last_name', 'user_name', 'email', 'phone_number', 'country_code'],
            ...condition
        }
        condition.include = [
            { model: models.EducationQualification },
            { model: models.WorkExperience },
        ]

        condition.where = {
            ...condition.where, ...{
                [Op.or]: [
                    {
                        first_name: {
                            [Op.like]: "%" + req.query.search + "%"
                        }
                    },
                    {
                        last_name: {
                            [Op.like]: "%" + req.query.search + "%"
                        }
                    },
                    {
                        email: {
                            [Op.like]: "%" + req.query.search + "%"
                        }
                    },
                ]
            }
        }

        async.parallel({
            count: function (parallelCallback: Function) {
                let countCondition: any = { where: condition.where };
                commonService.count(countCondition, models.User, function (err: Error, response: any) {
                    parallelCallback(err, response);
                });
            },
            rows: function (parallelCallback: Function) {
                commonService.findAll(condition, models.User, function (err: Error, response: any) {
                    parallelCallback(err, response);
                });
            }
        }, function (err, result) {
            callback(err, result)
        })
    }
}

var getUserService = new GetUserService();
export default getUserService;