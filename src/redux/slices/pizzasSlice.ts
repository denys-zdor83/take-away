import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";
import { Sort } from "./filterSlice";

export type SearchPizzaParams = {
  currentPage: number;
  category: string;
  search: string;
  sortBy: string;
}

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
  totalPages: number;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
  totalPages: 0,
}

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

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // @ts-ignore
        state.items = action.payload.items;
        // @ts-ignore
        state.totalPages = action.payload.meta.total_pages;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
      })
  },
})

export const selectPizzasData = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
