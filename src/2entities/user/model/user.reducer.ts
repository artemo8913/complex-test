import { Reducer } from "react";

import { User } from "./user.type";

export type UserAction = { type: "initiate"; user: User } | { type: "updatePhone"; phone: string };

export const userReducer: Reducer<User, UserAction> = (user, action) => {
  switch (action.type) {
    case "initiate": {
      return action.user;
    }
    case "updatePhone": {
      return { ...user, phone: action.phone };
    }
    default: {
      throw Error(`Unknown action: ${action}`);
    }
  }
};
