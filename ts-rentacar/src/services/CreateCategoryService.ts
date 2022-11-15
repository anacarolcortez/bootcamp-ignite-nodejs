import { CategoriesRepository } from "../repositories/CategoriesRepository"
import { ICategoriesRepository } from "../repositories/ICategoriesRepository"


interface IRequestCategory {
    name: string
    description: string
}

class CreateCategoryService {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute({ name, description }: IRequestCategory) {
        const categoryExists = this.categoriesRepository.findByName(name)
        if (categoryExists) {
            throw new Error("Category already exists")
        }

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryService }