import { Router } from "express"
import { categoriesRoutes } from "./CategoriesRoutes"
import { specificationsRoutes } from "./SpecificationsRoute"

const router = Router()


router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)

export { router }

