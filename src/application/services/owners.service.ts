import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService, InternalServerException, ValidationException } from "../../base";
import { OwnersRepository } from "../../infrastructure/repositories/owners.repository";
import { FirmsService } from "./firms.service";
import { ErrorConstants } from "../constants/error.constants";
import { DEFAULT_FIRM_NAME } from "../constants/common.constants";

@provide(Instances.OwnersService as any)
export class OwnersService extends BaseService {
  @inject(Instances.FirmsService as any)
  private firmsService!: FirmsService;
  constructor(
    @inject(Instances.OwnersRepository as any)
    repository: OwnersRepository,
  ) {
    super(repository);
  }

  async create(data: any): Promise<any> {
    let { email, mobile } = data;
    if (!email && !mobile) throw new ValidationException(ErrorConstants.PLEASE_PROVIDE_VALID_DETAILS);

    let [[firm]] = await this.firmsService.filterInternal({ name: DEFAULT_FIRM_NAME, email, mobile });
    if (!firm) {
      firm = await this.firmsService.create({ name: DEFAULT_FIRM_NAME, email, mobile });
    }
    if (!firm) throw new InternalServerException(ErrorConstants.FIRM_CREATION_FAILED);
    data.firm_id = firm?.id;
    return await this.repository.createInternal(data);
  }
}
