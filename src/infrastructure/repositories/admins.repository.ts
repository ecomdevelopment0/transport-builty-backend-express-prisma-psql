import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { BaseRepository } from "../../base";
import { prisma } from "../datasource/db.config";

@provide(Instances.AdminsRepository as any)
export class AdminsRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.ADMINS, prisma);
  }
}
