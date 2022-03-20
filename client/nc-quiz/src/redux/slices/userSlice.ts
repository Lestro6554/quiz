import { createSlice } from "@reduxjs/toolkit";
import User from "../../models/user";

export interface State {
    user: User
}
const initialState: State = {
    user: {
        userId: undefined,
        name: undefined,
        login: undefined,
        fullname: undefined
    }
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user.userId = action.payload.userId;
            state.user.name = action.payload.name;
            state.user.login = action.payload.login;
            state.user.fullname = action.payload.fullname;
        },
        logout(state) {
            state.user.userId = undefined;
            state.user.name = undefined;
            state.user.login = undefined;
            state.user.fullname = undefined;
        },
    },
});
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;