import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource/db.config";
import { BaseRepository } from "../../base";

@provide(Instances.BlacklistsRepository as any)
export class BlacklistsRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.BLACKLISTS, prisma);
  }
}
