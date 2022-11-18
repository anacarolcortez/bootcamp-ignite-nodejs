import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User()
    Object.assign(user, {
      name,
      email
    })
    this.users.push(user)
    const createdUser = this.findByEmail(email)
    return createdUser
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id === id)
    return user
  }

  findByEmail(email: string): User {
    const user = this.users.find(u => u.email === email)
    return user
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find(td => td.id === receivedUser.id)
    if (user){
      user.admin = true
      user.updated_at = new Date()
    }
    return user
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
