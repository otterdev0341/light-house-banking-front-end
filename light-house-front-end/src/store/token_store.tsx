import { create } from "zustand";

interface TokenStoreState {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const useTokenStore = create<TokenStoreState>((set) => ({
    token: null,
    setToken: (token: string) => set(() => ({ token })),
    clearToken: () => set(() => ({ token: null })),
}));

export default useTokenStore;