import { Router } from "express"
import { CategoriesRepository } from "../repositories/CategoriesRepository"
import { CreateCategoryService } from "../services/CreateCategoryService"

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body
    try {
        const createCategoryService = new CreateCategoryService(categoriesRepository)
        createCategoryService.execute({ name, description })
    } catch (err) {
        response.status(400).json({ error: `${err.message}` })
    }

    return response.status(201).send()
})

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list()
    return response.status(200).json(categories)
})


export { categoriesRoutes }