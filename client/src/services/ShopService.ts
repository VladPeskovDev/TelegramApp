import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { ShopsSchema } from "../utils/validatorsShop";
import type { ApiResponce } from "../types/ShopTypes";


class ShopService {
    constructor( private readonly api: AxiosInstance) {}

    async getShops(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/shops');
        return ShopsSchema.parse(data);
    }
} 

export default new ShopService(apiInstance);