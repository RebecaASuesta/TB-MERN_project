import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postsService from "./postsService"

const initialState = {
    posts: [],
    isLoading: false,
    post: {},
    comments: [],
    formData: {}
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
    async (formData) => {
    try {
        return await postsService.create(formData);
    } catch (error) {
        console.error(error);
    }
});

export const createComment = createAsyncThunk(
    "comments/create",
    async (commentData) => {
    try {
        return await postsService.createComment(commentData);
    } catch (error) {
        console.error(error);
    }
});

export const getInfo = createAsyncThunk(
    "users/getInfo",
    async () => {
        try {
            return await postsService.getInfo();
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
            state.posts = [ ...state.posts, action.payload.post ]
        });
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.post.commentIds = [ ...state.post.commentIds, action.payload.comment ]
        });
    }
})

export const { reset } = postsSlice.actions
export default postsSlice.reducer