import * as async from "async";
import * as crypto from "crypto";
import { models } from "../models/model";
import commonService from "./commonService";
import * as nodemailer from "nodemailer";
import { cryptoCommon } from "../../utils/commonUtil";
import * as _ from "lodash";
import jwtUtils from "../../utils/jwtUtils";

class UserService {

    constructor() { }

    public signupWithUser(req: any, callback: Function) {
        var data = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                commonService.findOne({ where: { email: data.email, user_name: data.user_name } }, models.User, function (err: any, response: any) {
                    if (err) return waterfallCallback(err, null);
                    if (response) {
                        if (response.user_name == data.user_name) return callback(new Error("Username number already exist."), null);
                        if (response.email == data.email) return callback(new Error("Email already exist."), null);
                        return callback(new Error("Something went wrong"), null);
                    } else {
                        waterfallCallback(null, null);
                    }
                })
            },
            function (info: any, waterfallCallback: Function) {

                if (data.email && data.password) {
                    data.hash = cryptoCommon.encrypt(JSON.stringify({ email: data.email, user_name: data.user_name }));
                }

                data.salt = crypto.randomBytes(16).toString('hex');
                data.password_string = crypto.pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`).toString(`hex`);

                data.confirmation_code = cryptoCommon.encrypt(JSON.stringify({ email: data.email, user_name: data.user_name }))
                data.status = "pending"

                data.created_at = new Date().toISOString();

                commonService.findOrCreate({ email: data.email }, data, models.User, function (err: any, response: any) {
                    waterfallCallback(err, response);
                })
            },
            function (userDtl: any, waterfallCallback: Function) {

                const output = `<h1>Email Confirmation</h1>
                <h2>Hello ${data.first_name} ${data.last_name}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href="http://localhost:7000/user/confirm?code=${userDtl[0].dataValues.confirmation_code}" > Click here</a>
                </div>`

                var sender = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'testnodemailerinnodejs@gmail.com',
                        pass: 'wsszvkuvpcpcljod'
                    }
                })

                var data1 = {
                    from: 'testnodemailerinnodejs@gmail.com',
                    to: data.email,
                    subject: `Sending email confirmation`,
                    html: output
                }

                sender.sendMail(data1, function (err, info) {
                    waterfallCallback(err, info, userDtl)
                })
            },
            function (info: any, userDtl: any, waterfallCallback: Function) {
                var reqData: any = {};

                commonService.update(reqData, { where: { user_id: data.user_id } }, models.User, function (err: Error, response: any) {
                    waterfallCallback(null, userDtl);
                })
            }
        ], function (err, result) {
            callback(null, result);
        })
    }

    public verifyUser(req: any, callback: Function) {
        var query = req.query;

        var requireObject = JSON.parse(cryptoCommon.decrypt(query.code));
        var email = requireObject.email;

        async.waterfall([
            function (waterfallCallback: Function) {
                commonService.findOne({ where: { email: email } }, models.User, function (err: Error, response: any) {
                    waterfallCallback(err, response);
                })
            },
            function (userDtl: any, waterfallCallback: Function) {
                if (decodeURIComponent(userDtl.confirmation_code) == decodeURIComponent(query.code)) {
                    var reqData: any = {};
                    reqData.status = "Accepted"
                    commonService.update(reqData, { where: { user_id: userDtl.user_id } }, models.User, function (err: Error, response: any) {
                        if (userDtl.status == "Accepted") {
                            waterfallCallback(err, { message: "Already accepted the mail" })
                        } else {
                            waterfallCallback(err, { message: reqData.status })
                        }
                    })
                } else {
                    waterfallCallback(new Error("Oops! this email does not exits please signup another mail"), null)
                }
            }
        ], function (err, result) {
            callback(err, result)
        })
    }

    public login(req: any, callback: Function) {

        var data = req.body;
        async.waterfall([
            function (waterfallCallback: Function) {
                var condition: any = {
                    where: {
                        email: data.email
                    }
                }
                commonService.findOne(condition, models.User, function (err: Error, userDtl: any) {
                    if (_.isEmpty(userDtl)) return waterfallCallback(new Error("Oops ! this email or user name does not exist. Please check spelling and try and again."), null);
                    waterfallCallback(err, userDtl)
                })
            },
            function (userDtl: any, waterfallCallback: Function) {
                var password_string = crypto.pbkdf2Sync(data.password, userDtl.salt, 1000, 64, `sha512`).toString(`hex`);

                if (userDtl.password_string === password_string) {
                    userService.loginSessionCreate(userDtl, function (err: Error, response: any) {
                        waterfallCallback(err, response.payload)
                    })
                } else {
                    var error = new Error("Password InCorrect")
                    waterfallCallback(error, null);
                }
            }
        ], function (err, result) {
            callback(err, result)
        })
    }

    public loginSessionCreate(userDtl: any, callback: Function) {

        var payload: any = {
            user_id: userDtl.user_id,
            first_name: userDtl.first_name,
            last_name: userDtl.last_name,
            email: userDtl.email,
            phone_number: userDtl.phone_number,
            user_name: userDtl.user_name
        }
        async.waterfall([
            function (waterfallCallback: Function) {
                var requiredStringForJwtToken = "User#Id_" + userDtl.user_id;
                jwtUtils.jwtSign({ redisId: requiredStringForJwtToken }, function (err: any, token: any) {
                    if (err) return waterfallCallback(new Error("Login error in token creation"), null);
                    return waterfallCallback(null, token, requiredStringForJwtToken)
                })
            },
            function (token: any, requiredStringForJwtToken: any, waterfallCallback: Function) {
                payload.token = token
                payload.created_dt = new Date();
                payload.key = requiredStringForJwtToken

                var data: any = {};

                data.key = requiredStringForJwtToken
                data.payload = payload;

                var reqFinalJson: any = {
                    payload: payload,
                }
                commonService.update(data, { where: { user_id: userDtl.user_id } }, models.User, function (err, payload) {
                    waterfallCallback(err, reqFinalJson)
                })
            }
        ], function (err, result) {
            callback(err, result)
        })
    }

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

    public userProfileBuilder(req: any, callback: Function) {
        var data = req.body;
        var educationDtl = data.education_qualification;
        var workExpDtl = data.work_experience;

        async.waterfall([
            function (waterfallCallback: Function) {
                commonService.update(data, { where: { user_id: data.user_id } }, models.User, waterfallCallback)
            },
            function (Dummy: any, waterfallCallback: Function) {
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
            callback(err, "Data updated")
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

var userService = new UserService();
export default userService;