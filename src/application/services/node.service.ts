import NodeCache from "node-cache";
const node_cache_service = new NodeCache();
import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { NODE_CACHE_USED_KEYS } from "../constants/common.constants";
import { ValidationException } from "../../base";

@provide(Instances.NodeService as any)
export class NodeService {
  async push(data: any) {
    for (let item of data) {
      if (NODE_CACHE_USED_KEYS.includes(item?.key)) {
        throw new ValidationException(`${item?.key} this is predefined key for cache, use another key`);
      }
      await node_cache_service.set(item?.key, item?.value);
    }
  }

  async pull(data: any) {
    let result = [];
    for (let item of data) {
      let res = await node_cache_service.get(item);
      result.push(res);
    }
    return result;
  }
}
