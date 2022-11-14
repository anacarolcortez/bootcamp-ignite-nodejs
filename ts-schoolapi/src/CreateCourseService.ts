interface Course {
    name: string, 
    duration?: number,
    educator: string
}


class CreateCourseService {

    execute({ name, duration, educator }: Course){
        console.log(`${name}, ${duration} weeks, ${educator}`)
    }
}

export default new CreateCourseService()