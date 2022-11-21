import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { UploadCategoryController } from "./UploadCategoryController";
import { UploadCategoryUseCase } from "./UploadCategoryUseCase";

export default (): UploadCategoryController => {
    const categoriesRepository = new CategoriesRepository()
    const uploadCategoryUseCase = new UploadCategoryUseCase(categoriesRepository)
    const uploadCategoryController = new UploadCategoryController(uploadCategoryUseCase)
    return uploadCategoryController
}
