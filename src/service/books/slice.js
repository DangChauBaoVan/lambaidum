import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async (pageNum, limit, query) => {
    console.log(query)
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    books: null,
    errorMessage: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.errorMessage = action.payload;
    });
  },
});

export default bookSlice.reducer;
