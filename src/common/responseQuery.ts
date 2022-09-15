import * as _ from "lodash";

class RouterResponse {

    public res: any

    objResponse(err, result: any, req: any, res: any) {
        var response = {} as any;

        if (_.isError(err) || !_.isEmpty(err)) {
            response = {
                status: false,
                message: "Internal Error",
                code: 500,
                Error: err.message
            }
        } else if (!_.isEmpty(result)) {
            response = {
                status: true,
                code: 200,
                message: "Success",
                data: result
            }
        } else {
            response = {
                status: true,
                code: 201,
                message: "Data Not Found",
                data: result
            }
        }
        
        return response

    }

}

export const routerResponse = new RouterResponse();