import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({
    currentPage,
    category,
    search,
    sort
  }) => {
    const fetchUrl = `https://c988e3cd7ecb047d.mokky.dev/pizzas?page=${currentPage}&limit=4${ category }&sortBy=${ sort.sortProperty }${ search }`

    const { data } = await axios.get(fetchUrl)
    return data
  },
)

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
  totalPages: 0,
}

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPages = action.payload.meta.total_pages;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error';
        state.items = [];
      })
  },
})

export const selectPizzasData = state => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
