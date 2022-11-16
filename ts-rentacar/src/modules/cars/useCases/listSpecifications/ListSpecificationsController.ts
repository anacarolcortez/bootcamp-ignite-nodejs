import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase"
import { Request, Response } from "express"

class ListSpecificationsController {
    constructor(private listSpecificationUseCase: ListSpecificationsUseCase){}

    handle(request: Request , response: Response){
        const list = this.listSpecificationUseCase.execute()
        return response.status(200).json(list)
    }
}

export { ListSpecificationsController }