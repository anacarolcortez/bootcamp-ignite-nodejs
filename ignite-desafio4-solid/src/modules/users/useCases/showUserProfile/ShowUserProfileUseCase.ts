import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute(user_id: string): User {
    const user = this.usersRepository.findById(user_id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }
}

export { ShowUserProfileUseCase };
