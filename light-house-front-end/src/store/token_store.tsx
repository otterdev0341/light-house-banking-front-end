import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStoreState {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const useTokenStore = create<TokenStoreState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: string) => {
                console.log("Saving token to store:", token);
                set(() => ({ token }));
            },
            clearToken: () => {
                console.log("Clearing token from store");
                set(() => ({ token: null }));
            },
        }),
        {
            name: "token-store", // Key to store in session storage
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    console.log("Getting token from sessionStorage:", value);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (key, value) => {
                    console.log("Saving token to sessionStorage:", value);
                    sessionStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: (key) => {
                    console.log("Removing token from sessionStorage");
                    sessionStorage.removeItem(key);
                },
            }
        }
    )
);

export default useTokenStore;