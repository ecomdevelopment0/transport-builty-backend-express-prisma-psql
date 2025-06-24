import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { FirmsRepository } from "../../infrastructure/repositories/firms.repository";
import { ChargesService } from "./charges.service";

@provide(Instances.FirmsService as any)
export class FirmsService extends BaseService {
  @inject(Instances.ChargesService as any)
  private chargesService!: ChargesService;
  constructor(@inject(Instances.FirmsRepository as any) repository: FirmsRepository) {
    super(repository);
  }

  async create(data: any): Promise<any> {
    let firm = await this.repository.createInternal(data);
    await this.chargesService.createManyInternal([
      {
        firm_id: firm?.id,
        name: "Freight Charge",
        description: "Cost incurred for transporting goods from the seller to the buyer's location.",
      },
      {
        firm_id: firm?.id,
        name: "Labour Charge",
        description: "Payment for manual labor involved in handling goods, such as moving or organizing.",
      },
      {
        firm_id: firm?.id,
        name: "Loading Charge",
        description: "Fee for loading goods onto a vehicle or container for transport.",
      },
      {
        firm_id: firm?.id,
        name: "Unloading Charge",
        description: "Fee for unloading goods from a vehicle or container at the destination.",
      },
      {
        firm_id: firm?.id,
        name: "Packaging Charge",
        description: "Cost of materials and labor used for securely packaging goods for shipment.",
      },
      {
        firm_id: firm?.id,
        name: "Un Packaging Charge",
        description: "Charge for removing packaging materials and setting up or sorting goods at the destination.",
      },
      {
        firm_id: firm?.id,
        name: "Other Charge",
        description: "Any additional or miscellaneous charges not covered under other categories.",
      },
    ]);
    return firm;
  }
}
