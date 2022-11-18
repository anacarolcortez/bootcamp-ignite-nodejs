import fs from "fs"
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IUploadCategory {
    name: string,
    description: string
}

class UploadCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    loadCategory(file: Express.Multer.File): Promise<IUploadCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IUploadCategory[] = []

            const stream = fs.createReadStream(file.path)
            const parseFile = parse({
                delimiter: ","
            })
            stream.pipe(parseFile)
            parseFile.on("data", async(line) => {
                const [ name, description ] = line
                categories.push({
                    name,
                    description
                })
            })
            .on("end", () => {
                resolve(categories)
            })
            .on("error", (err) => {
                reject(err)
            })

        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file)
        
        categories.map(async (category) => {
            const { name, description } = category
            const hasCategory = this.categoriesRepository.findByName(name)
            if (!hasCategory){
                this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }

}

export { UploadCategoryUseCase }