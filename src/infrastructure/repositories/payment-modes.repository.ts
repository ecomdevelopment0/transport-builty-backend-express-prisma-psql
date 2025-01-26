import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource";
import { BaseRepository } from "../../base";

@provide(Instances.PaymentModesRepository as any)
export class PaymentModesRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.PAYMENT_MODES, prisma);
  }
}
