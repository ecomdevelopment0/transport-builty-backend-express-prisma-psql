import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource/db.config";
import { BaseRepository } from "../../base";

@provide(Instances.InvoicesRepository as any)
export class InvoicesRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.INVOICES, prisma);
  }
}
