import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const fetchOrders = createAsyncThunk(
  "fetch/order",
  async ({user}, thunkAPI) => {
    try {
      const orders = await fetch(`http://localhost:4000/orders/${user}`);
      return orders.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addOrder = createAsyncThunk(
  "add/order",
  async (
    { user, number, items, date, address, phone, totalPrice },
    thunkAPI
  ) => {
    try {
      const addedOrder = await fetch(`http://localhost:4000/order/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          items,
          date,
          address,
          phone,
          totalPrice,
        }),
      });
      return addedOrder.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.reverse();
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;
