import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequestSpecification {
    name: string,
    description: string
}

class CreateSpecificationUseCase {

    constructor(private specificationsRepository: ISpecificationsRepository) { }

    async execute({ name, description }: IRequestSpecification) {
        const specificationExists = await this.specificationsRepository.findByName(name)
        if (specificationExists) {
            throw new Error("Specification already exists")
        }
        this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }