import * as _ from "lodash";
import { models } from "../src/models/model";
import commonService from "../src/services/commonService";
import jwtUtils from "./../utils/jwtUtils";


export class AuthServer {

    constructor() { }

    public verifyClientSessionMiddeleware(req: any, res: any, next: any) {

        var tokenFromHeader = req.query.token || req.headers['x-access-token'];

        if (!tokenFromHeader) {
            var error = new Error("Token is not detected")

            var response = {
                status: false,
                message: "Auth Error",
                code: 400,
                err: error.message
            }

            return res.status(400).send(response)
        }

        jwtUtils.jwtVerify(tokenFromHeader, function (err: any, decode: any) {

            var error = new Error("Authendication Expired , Please login again")

            var errResponse = {
                status: false,
                message: "Auth Error",
                code: 400,
                err: error.message
            }
            var payload: any = {};

            // if (_.isError(err)) {
            //     jwtUtils.jwtSignSetWithExpireTime({ redisId: decode.redisId }, function (err: any, token: any) {

            //     })
            // }

            commonService.findOne({ where: { key: decode.redisId } }, models.User, function (err, response) {
                if (err) return res.status(400).send(errResponse);
                if (!response) return res.status(400).send(errResponse);

                var JsonDecode = response.payload;

                if (tokenFromHeader === JsonDecode.token) {
                    req.session = response.payload
                    req.session.user_id = response.payload.user_id;
                    return next();
                }
                errResponse.err = "Your session is terminated as we have detected another login.Re-login to continue.";
                return res.status(400).send(errResponse);
            })
        })
    }
}
const authServer = new AuthServer();
export default authServer;