import { create } from "zustand";
import { userSlice, UserSliceType } from "./userSlice";

type StoreState = UserSliceType;

export const useAppStore = create<StoreState>((...a) => ({
  ...userSlice(...a),
}));
