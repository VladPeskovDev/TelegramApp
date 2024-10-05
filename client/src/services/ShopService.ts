import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { ShopSchema, ShopsSchema } from "../utils/validatorsShop";
import type { ApiResponce, ShopType, ShopDataType, ShopQueueResponse } from "../types/ShopTypes";


class ShopService {
    constructor( private readonly api: AxiosInstance) {}

    async getShops(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/shops');
        return ShopsSchema.parse(data);
    }

    async getShopById(id: number): Promise<ShopType> {
        const {data} = await this.api.get<ShopType>(`/shops/${id}`);
        return ShopSchema.parse(data);
    }

   /* async getShopQueueTomorrow(id: number): Promise<ShopType> {
    const response = await this.api.get(`/api/shops/${id}/tomorrow`); 
    return ShopSchema.parse(response.data); 
  } */

    /* async getShopQueueByDate(store_id: string, date: string): Promise<ShopQueueResponse> {
        const { data } = await this.api.get(`/shops/${store_id}/queue/${date}`);
        return data as ShopQueueResponse; // Добавляем тип для возвращаемого объекта
      } */

} 

export default new ShopService(apiInstance);