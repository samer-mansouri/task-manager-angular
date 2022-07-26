import { createAction } from "@ngrx/store";
import { User } from "../../model/User";

export const setUsers = createAction("SET_USERS", payload => payload);
export const appendUser = createAction("APPEND_USER", payload => payload);
export const removeUser = createAction("REMOVE_USER", payload => payload);
export const updateUser = createAction("UPDATE_USER", payload => payload);
