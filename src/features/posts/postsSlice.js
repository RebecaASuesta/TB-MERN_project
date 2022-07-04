import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postsService from "./postsService"

const initialState = {
    posts: [],
    isLoading: false,
    post: {},
    comments: []
};

export const getAll = createAsyncThunk(
    "posts/getAll",
    async () => {
        try {
            return await postsService.getAll();
        } catch (error) {
            console.error(error);
        }
    });

export const getById = createAsyncThunk(
    "posts/getById/id",
    async (_id) => {
        try {
            return await postsService.getById(_id);
        } catch (error) {
            console.error(error);
        }
    });

export const create = createAsyncThunk(
    "posts/create",
    async () => {
    try {
        return await postsService.create();
    } catch (error) {
        console.error(error);
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.posts = action.payload
        });
        builder.addCase(getAll.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getById.fulfilled, (state, action) => {
            state.post = action.payload
        });
        builder.addCase(create.fulfilled, (state, action) => {
            state.post = action.payload
        });
    }
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer