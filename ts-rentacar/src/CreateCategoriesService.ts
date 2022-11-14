interface Course {
    name: string, 
    duration?: number,
    educator: string
}


class CreateCourseService {

    execute({ duration=6, name, educator }: Course){
        console.log(`${name}, ${duration} weeks, ${educator}`)
    }
}

export default new CreateCourseService()