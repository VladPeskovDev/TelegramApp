import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import type { ShopQueueResponse } from "../types/ShopTypes";


class ShopDataService {
    constructor( private readonly api: AxiosInstance) {}
  
    async getShopQueueByDate(store_id: string, date: string): Promise<ShopQueueResponse> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await this.api.get(`/shops/${store_id}/queue/${date}`);
      return data as ShopQueueResponse;
    }
  }

export default new ShopDataService(apiInstance);