import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, { getState }) => {
        const response = await fetch('https://fakestoreapi.com/users')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        return response.json()
    },
    {
        condition: (_, { getState }) => {
            const { users } = getState()
            if (users.items.length > 0 || users.loading) {
                return false
            }
        }
    }
)

const slice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.error = null
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong!'
            })
    },
})

export const getAllUsers = (state) => state.users.items
export const getUsersLoadingState = (state) => state.users.loading
export const getUsersError = (state) => state.users.error

export default slice.reducer