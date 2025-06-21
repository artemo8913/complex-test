"use client";
import { ActionDispatch, createContext, PropsWithChildren, useContext, useEffect, useReducer } from "react";

import { User } from "../model/user.type";
import { UserAction, userReducer } from "../model/user.reducer";

const LOCAL_STORAGE_USER_KEY = "user";
const INITIAL_USER: User = { phone: "" };

const UserContext = createContext(INITIAL_USER);
const UserDispatchContext = createContext((() => {}) as ActionDispatch<[action: UserAction]>);

export const useUser = () => useContext(UserContext);

export const useUserDisptach = () => useContext(UserDispatchContext);

export function UserProvider(props: PropsWithChildren) {
  const [user, dispatch] = useReducer(userReducer, INITIAL_USER);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (value) {
      const storedUser = JSON.parse(value);

      dispatch({ type: "initiate", user: storedUser });
    }
  }, []);

  useEffect(() => localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user)), [user]);

  return (
    <UserContext value={user}>
      <UserDispatchContext value={dispatch}>{props.children}</UserDispatchContext>
    </UserContext>
  );
}
