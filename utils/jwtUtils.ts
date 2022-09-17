import * as jwt from "jsonwebtoken";

export class JWTServer {

    constructor() { }

    public jwtSign(data: any, callback: Function) {

        jwt.sign(data, "adloggsangular&5&secret@mission", { algorithm: 'HS512' }, function (err, token) {
            callback(err, token)
        });
    }

    public jwtSignSetWithExpireTime(data: any, exp_time: any, callback: Function) {

        jwt.sign(data, "adloggsangular&5&secret@mission", { algorithm: 'HS512', expiresIn: exp_time }, function (err, token) {
            callback(err, token)
        });
    }

    public jwtVerify(token: string, callback: Function): any {

        jwt.verify(token, "adloggsangular&5&secret@mission", function (err, decoded: any) {
            callback(err, decoded)
        });
    }

}
const jwtServer = new JWTServer();
export default jwtServer;