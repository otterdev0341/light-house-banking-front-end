import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResEntryIncomeDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    asset_name: string;
    contact_name: string;
    note: string;
    created_at: string;
    updated_at: string;
}

export interface ResListIncomeDto {
    length: number;
    data: ResEntryIncomeDto[];
}

interface IncomeStoreState {
    incomes: ResListIncomeDto | null;
    setIncomes: (incomes: ResListIncomeDto) => void;
    clearIncomes: () => void;
}

const useIncomeStore = create<IncomeStoreState>()(
    persist(
        (set) => ({
            incomes: null,
            setIncomes: (incomes: ResListIncomeDto) => set(() => ({ incomes })),
            clearIncomes: () => set(() => ({ incomes: null })),
        }),
        {
            name: "income-store", // Key to store in session storage
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

export default useIncomeStore;