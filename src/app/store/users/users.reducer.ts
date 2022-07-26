import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/User";
import { setUsers, appendUser, removeUser, updateUser } from "./users.actions";


export const initialState : User[] = [];


export const usersReducer = createReducer(
    initialState,
    on(setUsers, (state, action) => state = action.users),
    on(appendUser, (state, action) => [...state, action.user]),
    on(removeUser, (state, action) => state.filter(user => user.id !== action.id)),
    on(updateUser, (state, action) => state.map(user => user.id === action.user.id ? action.user : user))
);