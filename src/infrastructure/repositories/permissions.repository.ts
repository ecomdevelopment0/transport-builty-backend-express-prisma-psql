import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource";
import { BaseRepository } from "../../base";

@provide(Instances.PermissionsRepository as any)
export class PermissionsRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.PERMISSIONS, prisma);
  }
}
