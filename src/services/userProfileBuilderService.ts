import * as async from "async";
import { models } from "../models/model";
import commonService from "./commonService";
import constant from "../common/constant";

export interface EntityAttributes { }

export class UserProfileService {

    public userProfileBuilder(req: any, callback: Function) {

        var data = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                commonService.update(data, { where: { user_id: data.user_id } }, models.User, waterfallCallback)
            },
            function (Dummy: any, waterfallCallback: Function) {

                var educationDtl = data.education_qualification;
                var reqArray: any = [];

                educationDtl.forEach((element) => {
                    var reqJson = {
                        user_id: data.user_id,
                        passed_out_year: element.passed_out_year,
                        institution: element.institution,
                        degree: element.degree,
                        percentage: element.percentage
                    }
                    reqArray.push(reqJson)
                });
                commonService.multiUpdateOrCreate(reqArray, ['user_id', 'passed_out_year', 'institution', 'degree', 'percentage'], models.EducationQualification, waterfallCallback)
            },
            function (Dummy: any, waterfallCallback: Function) {

                var workExpDtl = data.work_experience;
                var workExpArray: any = [];

                workExpDtl.forEach((element) => {
                    var reqJson = {
                        user_id: data.user_id,
                        company: element.company,
                        end_date: element.end_date,
                        start_date: element.start_date
                    }
                    workExpArray.push(reqJson);
                });
                commonService.multiUpdateOrCreate(workExpArray, ['user_id', 'company', 'end_date', 'start_date'], models.WorkExperience, waterfallCallback)
            }
        ], function (err, result) {
            callback(err, constant.UpdateMsg)
        })
    }

}

export const userProfileService = new UserProfileService()
export default userProfileService