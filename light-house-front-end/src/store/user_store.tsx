import { create } from "zustand";
import type { ResMeDto } from "../domain/dto/user_dto";




interface UserStoreState {
    user: ResMeDto | null;
    setUser: (user: ResMeDto) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStoreState>((set) => ({
    user: null,
    setUser: (user: ResMeDto) => set(() => ({ user })),
    clearUser: () => set(() => ({ user: null })),
}));

export default useUserStore;