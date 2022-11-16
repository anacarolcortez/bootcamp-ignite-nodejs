import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from "express"

class CreateSpecificationController {

    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

    handle(request: Request, response: Response) {
        const { name, description } = request.body
        try {
            this.createSpecificationUseCase.execute({ name, description })
        } catch (err) {
            response.status(400).json({ error: `${err}` })
        }
        response.status(201).send()
    }
}

export { CreateSpecificationController }