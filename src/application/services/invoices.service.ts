import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { InvoicesRepository } from "../../infrastructure/repositories/invoices.repository";

@provide(Instances.InvoicesService as any)
export class InvoicesService extends BaseService {
  constructor(@inject(Instances.InvoicesRepository as any) repository: InvoicesRepository) {
    super(repository);
  }
}
