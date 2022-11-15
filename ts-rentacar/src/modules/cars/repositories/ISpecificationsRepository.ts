import { Specification } from "../models/Specification"

interface ISpecificationsDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({ name, description }: ISpecificationsDTO): void
    list() : Specification[]
    findByName(name: string): Specification
}

export { ISpecificationsRepository, ISpecificationsDTO }