import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource";
import { BaseRepository } from "../../base";

@provide(Instances.RentalProductsRepository as any)
export class RentalProductsRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.RENTAL_PRODUCTS, prisma);
  }
}
