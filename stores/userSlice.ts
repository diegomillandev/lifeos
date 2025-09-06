import { getUser } from "@/actions/get-user";
import { StateCreator } from "zustand";

type User  = {
    id: string;
    name?: string | null | undefined; 
    email: string | null;
}

export type UserSliceType = {
    user: User | null;
    fetchUser: () => Promise<void>;
}

export const userSlice: StateCreator<UserSliceType> = (set) => ({
    user: null,
    fetchUser: async () => {
        const user = await getUser();
        set(({ user }) );
    },
})