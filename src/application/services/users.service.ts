import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { UsersRepository } from "../../infrastructure/repositories/users.repository";

@provide(Instances.UsersService as any)
export class UsersService extends BaseService {
  constructor(@inject(Instances.UsersRepository as any) repository: UsersRepository) {
    super(repository);
  }
}
