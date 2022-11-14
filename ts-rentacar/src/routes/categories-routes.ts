import { Router } from "express"
import { Category } from "../models/Category"
import { CategoriesRepository } from "../repositories/categories-repository"

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body
    categoriesRepository.create( { name, description } )
    return response.status(201).send()
})

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.listAllCategories()
    return response.status(200).json(categories)
})


export { categoriesRoutes }