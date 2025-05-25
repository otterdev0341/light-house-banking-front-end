import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListAssetDto } from "../domain/dto/asset_dto";



interface AssetStoreState {
    assets: ResListAssetDto | null;
    setAssets: (assets: ResListAssetDto) => void;
    clearAssets: () => void;
}

const useAssetStore = create<AssetStoreState>()(
    persist(
        (set) => ({
            assets: null,
            setAssets: (assets: ResListAssetDto) => set(() => ({ assets })),
            clearAssets: () => set(() => ({ assets: null })),
        }),
        {
            name: "asset-store", // Key to store in session storage
            storage: {
                getItem: (key) => {
                    const value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

export default useAssetStore;