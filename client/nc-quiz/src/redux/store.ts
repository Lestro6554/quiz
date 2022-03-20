import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import quizReducer from "./slices/quizSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        quiz: quizReducer
    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 