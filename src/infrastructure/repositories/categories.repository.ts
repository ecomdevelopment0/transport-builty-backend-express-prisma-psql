import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource";
import { BaseRepository } from "../../base";

@provide(Instances.CategoriesRepository as any)
export class CategoriesRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.CATEGORIES, prisma);
  }
}
