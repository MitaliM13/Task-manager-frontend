import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "@/app/store/userSlice";

export const store = configureStore({
    reducer: {
        user: useReducer
    }
})