import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute(user_id: string): User {
    const user = this.usersRepository.findById(user_id)
    if (!user){
      throw new Error("User not found")
    }
    const userAdmin = this.usersRepository.turnAdmin(user)
    return userAdmin
  }
}

export { TurnUserAdminUseCase };
