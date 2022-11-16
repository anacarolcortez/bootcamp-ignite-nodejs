import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase{
    constructor(private specificationsRepository: ISpecificationsRepository){}

    execute(): Specification[]{
        const list = this.specificationsRepository.list()
        return list
    }
}

export { ListSpecificationsUseCase }