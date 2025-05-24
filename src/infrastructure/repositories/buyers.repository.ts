import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource/db.config";
import { BaseRepository } from "../../base";

@provide(Instances.BuyersRepository as any)
export class BuyersRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.BUYERS, prisma);
  }
}
