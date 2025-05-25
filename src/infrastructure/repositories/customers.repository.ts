import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource/db.config";
import { BaseRepository } from "../../base";

@provide(Instances.CustomersRepository as any)
export class CustomersRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.CUSTOMERS, prisma);
  }
}
