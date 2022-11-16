import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequestSpecification {
    name: string,
    description: string
}

class CreateSpecificationUseCase {

    constructor(private specificationsRepository: ISpecificationsRepository) { }

    execute({ name, description }: IRequestSpecification) {
        const specificationExists = this.specificationsRepository.findByName(name)
        if (specificationExists) {
            throw new Error("Specification already exists")
        }
        this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }