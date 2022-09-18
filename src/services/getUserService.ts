import { models } from "../models/model";
import commonService from "./commonService";
import * as _ from "lodash";

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
        var condition: any = {
            where: {},
            attributes: ['user_id', 'first_name', 'last_name', 'user_name', 'email', 'phone_number', 'country_code']
        }
        condition.include = [
            { model: models.EducationQualification },
            { model: models.WorkExperience },
        ]

        // if (query.first_name) condition.include[0].where = { first_name: { [Op.like]: `%${query.first_name}%` } }

        commonService.findAll(condition, models.User, function (err: Error, response: any) {
            callback(err, response)
        })
    }

}

var getUserService = new GetUserService();
export default getUserService;