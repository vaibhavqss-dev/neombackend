"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loadUserFromStorage = exports.saveUserToRedux = void 0;
const store_1 = require("./store");
const userSlice_1 = require("./features/userSlice");
const saveUserToRedux = (userData) => {
    store_1.store.dispatch((0, userSlice_1.setUser)(userData));
    localStorage.setItem('user', JSON.stringify(userData));
};
exports.saveUserToRedux = saveUserToRedux;
const loadUserFromStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const parsedUser = JSON.parse(userData);
            store_1.store.dispatch((0, userSlice_1.setUser)(parsedUser));
        }
        catch (error) {
            console.error('Failed to parse user data from localStorage', error);
        }
    }
};
exports.loadUserFromStorage = loadUserFromStorage;
const logoutUser = () => {
    store_1.store.dispatch((0, userSlice_1.clearUser)());
    localStorage.removeItem('user');
};
exports.logoutUser = logoutUser;
