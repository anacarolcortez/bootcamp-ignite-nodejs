import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequestCategory {
    name: string
    description: string
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ name, description }: IRequestCategory) : Promise<void> {
        const categoryExists = await this.categoriesRepository.findByName(name)
        if (categoryExists) {
            throw new Error("Category already exists")
        }

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }