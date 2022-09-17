import * as async from "async";
import * as crypto from "crypto";
import { models } from "../models/model";
import commonService from "./commonService";
import * as nodemailer from "nodemailer";
import { cryptoCommon } from "../../utils/commonUtil";
import * as _ from "lodash";

class UserService {

    constructor() { }

    public signupWithUser(req: any, callback: Function) {
        var data = req.body;

        async.waterfall([
            function (waterfallCallback: Function) {
                commonService.findOne({ where: { email: data.email } }, models.User, function (err: any, response: any) {
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

                const secretCode = Math.floor(100000 + Math.random() * 900000);

                const output = `<h1> Welcome to my Product </h1>
                <h2>Hi ${data.email}</h2>
                <br></br>
                <h3> OTP: ${secretCode} </h3>
                <h4>Please enter the below code to complete verification</h4>`

                var sender = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'srisandystar@gmail.com',
                        pass: 'herosir@12'
                    }
                })

                var data1 = {
                    from: 'srisandystar@gmail.com',
                    to: data.email,
                    subject: `One Time Password(${secretCode})`,
                    html: output
                }

                sender.sendMail(data1, function (err, info) {
                    waterfallCallback(err, info)
                })
            },
            function (info: any, waterfallCallback: Function) {
                // info = true;
                // if (info == true) {

                if (data.email && data.password) {
                    data.hash = cryptoCommon.encrypt(JSON.stringify({ email: data.email, password: data.password }));
                }

                data.salt = crypto.randomBytes(16).toString('hex');
                data.password_string = crypto.pbkdf2Sync(data.password, data.salt, 1000, 64, `sha512`).toString(`hex`);

                var requireObject = JSON.parse(cryptoCommon.decrypt(data.hash));
                data.email = requireObject.email.toLowerCase();
                data.password = requireObject.password;

                data.created_at = new Date().toISOString();

                commonService.findOrCreate({ email: data.email }, data, models.User, function (err: any, response: any) {
                    waterfallCallback(err, response);
                })
                // } else {
                //     waterfallCallback(null, null)
                // }
            },
        ], function (err, result) {
            callback(null, result);
        })
    }

    public login(req: any, callback: Function) {
        var data = req.body;
        async.waterfall([
            function (waterfallCallback: Function) {
                var condition: any = { where: {} }

                if (data.user_name) {
                    condition.where.user_name = data.user_name
                } else {
                    condition.where.email = data.email
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
                        waterfallCallback(err, response)
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
        async.waterfall([
            function (waterfallCallback: Function) {
                var payload = {
                    user_id: userDtl.user_id,

                }
            }
        ], function (err, result) {

        })
    }
}

var userService = new UserService();
export default userService;