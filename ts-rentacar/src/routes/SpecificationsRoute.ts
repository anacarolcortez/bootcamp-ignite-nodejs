import { Router } from "express"
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository"
import { CreateSpecificationService } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase"

const specificationsRoutes = Router()
const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body
    try {
        const createSpecificationService = new CreateSpecificationService(specificationsRepository)
        createSpecificationService.execute({ name, description })
    } catch (err) {
        response.status(400).json({ error: `${err}` })
    }
    response.status(201).send()
})

specificationsRoutes.get("/", (request, response) => {
    const list = specificationsRepository.list()
    response.status(200).json(list)
})

export { specificationsRoutes }