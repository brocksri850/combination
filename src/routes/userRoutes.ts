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
        this.router.get("/getuser", this.getByUser);
        this.router.get("/getallusers", this.getAllUsers);
        this.router.put("/updateuser", this.userProfileBuilder);
        this.router.get("/confirm", this.verifyUser);
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

    public getByUser(req: any, res: any) {
        try {
            userService.getByUser(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public userProfileBuilder(req: any, res: any) {
        try {
            userService.userProfileBuilder(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public getAllUsers(req: any, res: any) {
        try {
            userService.getAllUsers(req, function (err: Error, response) {
                var commonResponse = routerResponse.objResponse(err, response, req, res);
                res.send(commonResponse);
            });
        } catch (err) {
            var commonResponse = routerResponse.objResponse(err, null, req, res);
            res.send(commonResponse);
        }
    }

    public verifyUser(req: any, res: any) {
        try {
            userService.verifyUser(req, function (err: Error, response) {
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