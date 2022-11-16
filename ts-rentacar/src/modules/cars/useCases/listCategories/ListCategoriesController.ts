import { Request, Response } from "express"
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response) {
        const list = this.listCategoriesUseCase.execute()
        return response.json(list)
    }

}

export { ListCategoriesController }