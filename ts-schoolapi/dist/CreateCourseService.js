"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, duration, educator }) {
        console.log(`${name}, ${duration} weeks, ${educator}`);
    }
}
exports.default = new CreateCourseService();
