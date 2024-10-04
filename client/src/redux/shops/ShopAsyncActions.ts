import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import ShopService from "../../services/ShopService";
// eslint-disable-next-line import/no-duplicates
import type { EditShopType, ShopDataType, ShopType} from "../../types/ShopTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/ShopTypes";


// eslint-disable-next-line import/prefer-default-export
export const getShopsThunk = createAsyncThunk<ApiResponce>(
    "shops/getAll",
    async () => {
        const data = await ShopService.getShops();
        return data;
    });

    export const getShopByIdThunk = createAsyncThunk<ShopType, number>(
        'shops/getById',
        async (id) => {
          const data = await ShopService.getShopById(id);
          return data;
        }
      );



    
