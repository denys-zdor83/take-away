import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, PizzasSliceState, SearchPizzaParams, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
  totalPages: 0,
}

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

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
