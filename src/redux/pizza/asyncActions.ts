import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const {
      currentPage,
      category,
      search,
      sortBy
    } = params;

    const fetchUrl = `https://c988e3cd7ecb047d.mokky.dev/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}${search}`
    const { data } = await axios.get<Pizza[]>(fetchUrl);
    
    return data;
  },
)