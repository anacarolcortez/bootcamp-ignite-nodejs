import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  checksAdmin(user_id: string): boolean {
    const user = this.usersRepository.findById(user_id)
    if (!user || !user.admin) {
      return false
    }
    return true
  }

  execute(user_id: any): User[] {
    const isAdmin = this.checksAdmin(user_id)
    if (isAdmin) {
      const list = this.usersRepository.list()
      return list
    } else {
      throw new Error("Only admin can list users")
    }
  }
}

export { ListAllUsersUseCase };
