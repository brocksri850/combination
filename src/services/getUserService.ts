import { models } from "../models/model";
import commonService from "./commonService";
import * as _ from "lodash";
import { routerResponse } from "../common/responseQuery";
const { Op } = require("sequelize");

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

        commonService.findAll(condition, models.User, function (err: Error, response: any) {
            callback(err, response)
        })
    }

}

var getUserService = new GetUserService();
export default getUserService;