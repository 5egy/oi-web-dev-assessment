import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    user:{}
  },
  reducers: {
    logOut(state, action) {
     state.user = {}
    },  setUser(state, action) {
      state.user = JSON.parse(window.localStorage.user)
     }
  },
  extraReducers(build) {
    build
      .addCase(getUsers.fulfilled, (state, actions) => {
        state.allUsers = actions.payload;
      })
      .addCase(getUser.fulfilled, (state, actions) => {
        state.user = actions.payload;
      })
      .addCase(postUser.fulfilled, (state, actions) => {
        state.user = actions.payload;
      });
  },
});

export const getUsers = createAsyncThunk("users/fetchUsers", async () => {
  const products = await fetch("https://segoblog.onrender.com/users/");
  return products.json();
});

export const getUser = createAsyncThunk("users/fetchUser", async (data) => {
  const products = await fetch("https://segoblog.onrender.com/login/" ,{
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  });
  return products.json();
});

export const postUser = createAsyncThunk("users/postUser", async (data) => {
  const products = await fetch("https://segoblog.onrender.com/register/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  });
  return products.json();
});



export const userActions = userSlice.actions;

export default userSlice;
