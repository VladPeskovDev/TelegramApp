import { createAsyncThunk } from "@reduxjs/toolkit";
import ShopService from "../../services/ShopService";
import { type ApiResponce } from "../../types/ShopTypes";


// eslint-disable-next-line import/prefer-default-export
export const getShopsThunk = createAsyncThunk<ApiResponce>(
    "shops/getAll",
    async () => {
        const data = await ShopService.getShops();
        return data;
    });

   



    
