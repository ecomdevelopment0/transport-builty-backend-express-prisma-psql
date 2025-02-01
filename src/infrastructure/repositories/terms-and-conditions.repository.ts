import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { EntityConstants } from "../constants/entity.constants";
import { prisma } from "../datasource";
import { BaseRepository } from "../../base";

@provide(Instances.TermsAndConditionsRepository as any)
export class TermsAndConditionsRepository extends BaseRepository {
  constructor() {
    super(EntityConstants.TERMS_AND_CONDITIONS, prisma);
  }
}
