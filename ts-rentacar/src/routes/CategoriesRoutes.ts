import { Router } from "express"
import multer from "multer"

import { createCategoryController } from "../modules/cars/useCases/createCategory"
import { listCategoriesController } from "../modules/cars/useCases/listCategories"
import { uploadCategoryController } from "../modules/cars/useCases/uploadCategory"

const categoriesRoutes = Router()

const upload = multer({
    dest: "./tmp"
})


categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response)
})

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response)
})

categoriesRoutes.post("/upload", upload.single("file"), (request, response) => {
    return uploadCategoryController.handle(request, response)
})


export { categoriesRoutes }