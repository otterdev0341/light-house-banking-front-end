import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResEntryExpenseTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ResListExpenseTypeDto {
    length: number;
    data: ResEntryExpenseTypeDto[];
}

interface ExpenseTypeStoreState {
    expenseTypes: ResListExpenseTypeDto | null;
    setExpenseTypes: (expenseTypes: ResListExpenseTypeDto) => void;
    clearExpenseTypes: () => void;
}

const useExpenseTypeStore = create<ExpenseTypeStoreState>()(
    persist(
        (set) => ({
            expenseTypes: null,
            setExpenseTypes: (expenseTypes: ResListExpenseTypeDto) => set(() => ({ expenseTypes })),
            clearExpenseTypes: () => set(() => ({ expenseTypes: null })),
        }),
        {
            name: "expense-type-store", // Key to store in session storage
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

export default useExpenseTypeStore;