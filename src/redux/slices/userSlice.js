import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedUser: JSON.parse(localStorage.getItem("loggedUser")),
  token: localStorage.getItem("token"),
  registeredUser: null,
};

function parseJwt(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (_, thunkAPI) => {
    try {
      const users = await fetch("http://localhost:4000/user");
      return users.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const registration = createAsyncThunk(
  "registration/users",
  async ({ username, password }, thunkAPI) => {
    try {
      const registration = await fetch("http://localhost:4000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      return registration.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authorization = createAsyncThunk(
  "authorization/users",
  async ({ username, password }, thunkAPI) => {
    try {
      const authorization = await fetch("http://localhost:4000/authorization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const token = await authorization.json();
      const loggedUser = parseJwt(token);
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      return { token, loggedUser };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk("logOut/users", async (_, thunkAPI) => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.token = localStorage.getItem("token");
        state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.registeredUser = action.payload;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(action.payload.loggedUser)
        );
        state.token = action.payload.token;
        state.loggedUser = action.payload.loggedUser;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = "";
        state.loggedUser = "";
      });
  },
});

export default userSlice.reducer;
