import { Specification } from "../../models/Specification"
import { ISpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository"

class SpecificationsRepository implements ISpecificationsRepository{
    private specifications: Specification[]

    private static INSTANCE: SpecificationsRepository

    private constructor() {
        this.specifications = []
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE){
            SpecificationsRepository.INSTANCE = new SpecificationsRepository
        }
        return SpecificationsRepository.INSTANCE
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