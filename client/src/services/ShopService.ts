import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { ShopSchema, ShopsSchema } from "../utils/validatorsShop";
import type { ApiResponce, ShopType } from "../types/ShopTypes";


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

} 

export default new ShopService(apiInstance);