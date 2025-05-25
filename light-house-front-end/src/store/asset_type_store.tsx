import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListAssetTypeDto } from "../domain/dto/asset_type_dto";


interface AssetTypeStoreState {
    assetTypes: ResListAssetTypeDto | null;
    setAssetTypes: (assetTypes: ResListAssetTypeDto) => void;
    clearAssetTypes: () => void;
}

const useAssetTypeStore = create<AssetTypeStoreState>()(
    persist(
        (set) => ({
            assetTypes: null,
            setAssetTypes: (assetTypes: ResListAssetTypeDto) => set(() => ({ assetTypes })),
            clearAssetTypes: () => set(() => ({ assetTypes: null })),
        }),
        {
            name: "asset-type-store", // Key to store in session storage
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

export default useAssetTypeStore;