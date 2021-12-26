import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!this.isAdmin(user_id)) {
      throw new Error("access denied");
    }
    const users = this.usersRepository.list();

    return users;
  }

  isAdmin(user_id: string): boolean {
    const user = this.usersRepository.findById(user_id);

    if (user.admin === true) {
      return true;
    }

    return false;
  }

  userExists(user_id: string): User {
    return this.usersRepository.findById(user_id);
  }
}

export { ListAllUsersUseCase };
