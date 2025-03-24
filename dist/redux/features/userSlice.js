"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUser = exports.setUser = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    username: null,
    user_id: null,
    fullname: null,
    isAuthenticated: false,
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.user_id = action.payload.user_id;
            state.fullname = action.payload.fullname;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.username = null;
            state.user_id = null;
            state.fullname = null;
            state.isAuthenticated = false;
        },
    },
});
_a = exports.userSlice.actions, exports.setUser = _a.setUser, exports.clearUser = _a.clearUser;
exports.default = exports.userSlice.reducer;
