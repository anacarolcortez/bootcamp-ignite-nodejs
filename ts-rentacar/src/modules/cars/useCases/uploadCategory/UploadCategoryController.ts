import { Request, Response } from "express"
import { UploadCategoryUseCase } from "./UploadCategoryUseCase"

class UploadCategoryController {

    constructor(private uploadCategoryUseCase: UploadCategoryUseCase){}

    handle(request: Request, response: Response) {
        const { file } = request
        this.uploadCategoryUseCase.execute(file)
        return response.send()
    }
}

export {UploadCategoryController }