import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './features/LoginSlice.js';
export const store = configureStore({
    reducer: {
        login: LoginSlice
    }
})

export default store;