import { Router } from "express";
import { routerResponse } from "../common/responseQuery";
import userService from "../services/userService";

export class UserRouter {
    public router;
    constructor() {
        this.router = Router();
        this.init()
    }
    init() {
        this.router.post("/signup", this.signupWithUser);
        this.router.post("/login", this.login);
    }

    public signupWithUser(req: any, res: any) {
        try {
            userService.signupWithUser(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public login(req: any, res: any) {
        try {
            userService.login(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

}
var userRouter = new UserRouter();
const router = userRouter.router
export default router