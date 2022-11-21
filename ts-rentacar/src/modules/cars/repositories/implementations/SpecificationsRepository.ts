import { Repository } from "typeorm"
import AppDataSource from "../../../../database/datasource"
import { Specification } from "../../entities/Specification"
import { ISpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository"

class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>

    constructor() {
        this.repository = AppDataSource.getRepository(Specification)
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find()
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: {
                name : name
            }
        })
        return specification
    }

    async create({ name, description }: ISpecificationsDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        })
        await this.repository.save(specification)
    }
    
}

export { SpecificationsRepository }