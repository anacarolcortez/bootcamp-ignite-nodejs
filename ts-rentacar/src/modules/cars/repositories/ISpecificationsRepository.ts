import { Specification } from "../entities/Specification"

interface ISpecificationsDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({ name, description }: ISpecificationsDTO): Promise<void>
    list() : Promise<Specification[]>
    findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ISpecificationsDTO }