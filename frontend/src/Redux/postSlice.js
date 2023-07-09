import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    edit: {
      title: "",
      content: "",
      category: "tech",
      tags: "",
      author: "",
      comments: [],
    },
    post:{}
  },
  reducers: {
   readPost(state, action) {
      state.post = state.allPosts.filter((el)=>el._id === action.payload)
    },
  },

  extraReducers(build) {
    build
      .addCase(getPosts.pending, (state, actions) => {
        state.pending = "PENDING";
      })
      .addCase(getPosts.fulfilled, (state, actions) => {
        state.allPosts = actions.payload;
      })
      .addCase(writePost.fulfilled, (state, actions) => {
        state.pending = "SUCCESS";
      })
      .addCase(getPost.fulfilled, (state, actions) => {
        state.edit = actions.payload;
      })
      .addCase(deletePost.fulfilled, (state, actions) => {});
    },
    
});

export const getPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const products = await fetch("https://segoblog.onrender.com/posts");
  return products.json();
});

export const getPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const products = await fetch("https://segoblog.onrender.com/posts/" + id);
  return products.json();
});

export const writePost = createAsyncThunk("posts/addPost", async (post) => {
  await fetch("https://segoblog.onrender.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-type": "application/json" },
  });
  return "succesful";
});

export const editPost = createAsyncThunk("posts/patchPost", async (id, post) => {
  await fetch("https://segoblog.onrender.com/posts/" + id , {
    method: "PATCH",
    body: JSON.stringify(post),
    headers: { "Content-type": "application/json" },
  });
  return "succesful";
});

export const deletePost = createAsyncThunk("posts/delPost", async (id) => {
  await fetch("https://segoblog.onrender.com/posts", {
    method: "DELETE",
    body: JSON.stringify({id: id}),
    headers: { "Content-type": "application/json" },
  });
  return "succesful";
});

export const actions = postSlice.actions;

export default postSlice;
