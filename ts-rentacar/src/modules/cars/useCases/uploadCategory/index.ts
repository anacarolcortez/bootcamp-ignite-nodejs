import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { UploadCategoryController } from "./UploadCategoryController";
import { UploadCategoryUseCase } from "./UploadCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance()
const uploadCategoryUseCase = new UploadCategoryUseCase(categoriesRepository)
const uploadCategoryController = new UploadCategoryController(uploadCategoryUseCase)

export { uploadCategoryController }