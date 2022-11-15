import { Specification } from "../models/Specification";
import { ISpecificationsDTO, ISpecificationsRepository } from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{
    private specifications: Specification[]

    constructor() {
        this.specifications = []
    }

    list(): Specification[] {
        return this.specifications
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(s => s.name === name)
        return specification
    }

    create({ name, description }: ISpecificationsDTO) {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            date: new Date()
        })

        this.specifications.push(specification)
    }
    
}

export { SpecificationsRepository }