import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListExpenseDto } from "../domain/dto/expense_dto";


interface ExpenseStoreState {
    expenses: ResListExpenseDto | null;
    setExpenses: (expenses: ResListExpenseDto) => void;
    clearExpenses: () => void;
}

const useExpenseStore = create<ExpenseStoreState>()(
    persist(
        (set) => ({
            expenses: null,
            setExpenses: (expenses: ResListExpenseDto) => set(() => ({ expenses })),
            clearExpenses: () => set(() => ({ expenses: null })),
        }),
        {
            name: "expense-store", // Key to store in session storage
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

export default useExpenseStore;