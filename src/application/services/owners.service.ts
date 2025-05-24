import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService, InternalServerException, ValidationException } from "../../base";
import { OwnersRepository } from "../../infrastructure/repositories/owners.repository";
import { FirmsService } from "./firms.service";
import { ErrorConstants } from "../constants/error.constants";

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

    let [[firm]] = await this.firmsService.filterInternal({ name: "Firm ABC", email, mobile });
    if (!firm) {
      firm = await this.firmsService.create({ name: "Firm ABC", email, mobile });
    }
    console.log({ firm });
    if (!firm) throw new InternalServerException("firm creation failed ...!");
    data.firm_id = firm?.id;
    console.log({ data });
    return await this.repository.createInternal(data);
  }
}
