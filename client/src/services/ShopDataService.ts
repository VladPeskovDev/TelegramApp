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

    async signupForQueue(store_id: string, date: string, first_name: string, last_name: string, telegram_id: string | null): Promise<void> {
      await this.api.post(`/shops/${store_id}/queue/${date}/signup`, {
        first_name,
        last_name,
        telegram_id,
      });
    }

    async deleteQueueEntry(store_id: string, date: string, telegram_id: string | null): Promise<void> {
      await this.api.delete(`/shops/${store_id}/queue/${date}/delete`, {
        data: {
          telegram_id,
        },
      });
    }
  }
  
  
export default new ShopDataService(apiInstance);