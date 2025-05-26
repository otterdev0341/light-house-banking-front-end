import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResEntryTransactionTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ResListTransactionTypeDto {
    length: number;
    data: ResEntryTransactionTypeDto[];
}

interface TransactionTypeStoreState {
    transactionTypes: ResListTransactionTypeDto | null;
    setTransactionTypes: (transactionTypes: ResListTransactionTypeDto) => void;
    clearTransactionTypes: () => void;
}

const useTransactionTypeStore = create<TransactionTypeStoreState>()(
    persist(
        (set) => ({
            transactionTypes: null,
            setTransactionTypes: (transactionTypes: ResListTransactionTypeDto) =>
                set(() => ({ transactionTypes })),
            clearTransactionTypes: () => set(() => ({ transactionTypes: null })),
        }),
        {
            name: "transaction-type-store", // Key to store in session storage
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

export default useTransactionTypeStore;