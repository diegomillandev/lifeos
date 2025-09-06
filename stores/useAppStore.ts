import { create } from "zustand";
import { userSlice, UserSliceType } from "./userSlice";

export const useAppStore = create<UserSliceType>((...a) => ({
  ...userSlice(...a),
}));
