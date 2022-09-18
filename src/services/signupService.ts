import constant from "../common/constant";
import commonService from "./commonService";
import * as nodemailer from "nodemailer";
import * as async from "async";
import * as crypto from "crypto";
import { models } from "../models/model";
import { cryptoCommon } from "../../utils/commonUtil";
import { routerResponse } from "../common/responseQuery";

export interface EntityAttributes { }

export class SignupService {

    public signupWithUser(req: any, callback: Function) {
        var data = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                var isValidPassword = routerResponse.checkPassword(data.password)
                if (isValidPassword == false) {
                    return callback(null, constant.InValidPassword)
                } else {
                    waterfallCallback(null, null)
                }
            },
            function (dummy: any, waterfallCallback: Function) {

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
            function (Dummy: any, waterfallCallback: Function) {

                data.salt = crypto.randomBytes(16).toString('hex');
                data.password_string = crypto.pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`).toString(`hex`);
                if (data.isActivationLinkRequired == true) {
                    data.confirmation_code = cryptoCommon.encrypt(JSON.stringify({ email: data.email, user_name: data.user_name }));
                    data.status = constant.Status.Pending;
                } else {
                    data.status = constant.Status.Accept
                }

                data.created_at = new Date().toISOString();

                commonService.findOrCreate({ email: data.email }, data, models.User, function (err: any, response: any) {
                    waterfallCallback(err, response);
                })
            },
            function (userDtl: any, waterfallCallback: Function) {

                const output = `<h1>Email Confirmation</h1>
                <h2>Hello ${data.first_name} ${data.last_name}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href="http://localhost:7000/user/confirm?code=${userDtl[0]?.dataValues?.confirmation_code}" > Click here</a>
                </div>`

                var sender = nodemailer.createTransport({
                    service: constant.Service,
                    auth: {
                        user: constant.Auth.User,
                        pass: constant.Auth.Pass
                    }
                })

                var data1 = {
                    from: constant.Auth.User,
                    to: data.email,
                    subject: constant.Subject,
                    html: output
                }

                sender.sendMail(data1, function (err, info) {
                    waterfallCallback(err, userDtl)
                })
            },
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
                    reqData.status = constant.Status.Accept;
                    commonService.update(reqData, { where: { user_id: userDtl.user_id } }, models.User, function (err: Error, response: any) {
                        if (userDtl.status == constant.Status.Accept) {
                            waterfallCallback(err, { message: constant.Status.NotAccept })
                        } else {
                            waterfallCallback(err, { message: reqData.status })
                        }
                    })
                } else {
                    waterfallCallback(new Error(constant.Error), null)
                }
            }
        ], function (err, result) {
            callback(err, result)
        })
    }

}

export const signupService = new SignupService()
export default signupService