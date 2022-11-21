import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export default (): ListSpecificationsController => {
    const specificationRepository = new SpecificationsRepository()
    const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationRepository)
    const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase)
    return listSpecificationsController    
}