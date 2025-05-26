import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResEntryTransferDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    asset_name: string;
    destination_asset_name: string;
    contact_name: string;
    note: string;
    created_at: string;
    updated_at: string;
}

export interface ResListTransferDto {
    length: number;
    data: ResEntryTransferDto[];
}

interface TransferStoreState {
    transfers: ResListTransferDto | null;
    setTransfers: (transfers: ResListTransferDto) => void;
    clearTransfers: () => void;
}

const useTransferStore = create<TransferStoreState>()(
    persist(
        (set) => ({
            transfers: null,
            setTransfers: (transfers: ResListTransferDto) => set(() => ({ transfers })),
            clearTransfers: () => set(() => ({ transfers: null })),
        }),
        {
            name: "transfer-store", // Key to store in session storage
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

export default useTransferStore;