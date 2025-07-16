import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
  users: IUser[];
}
export type DraftUser = Pick<IUser, "name">;

const initialState: User = {
  users: [
    {
      name: "Sushanto",
      id: "wrtlkwetrkewtlwre",
    },
    {
      name: "Mir",
      id: "wrtlkwetdadrkewtlwre",
    },
    {
      name: "Mezba",
      id: "wrtlkwetrkewfdstlwre",
    },
    {
      name: "Sohoj",
      id: "wrtlkwetrkedwtlwre",
    },
  ],
};

const createUser = (state: DraftUser): IUser => {
  return { ...state, id: nanoid() };
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.users.push(user);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const userSelector = (state: RootState) => {
  return state.user.users;
};

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
