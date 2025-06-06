import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListCurrentSheetDto } from "../domain/dto/current_sheet_dto";

interface CurrentSheetStoreState {
    currentSheet: ResListCurrentSheetDto | null;
    setCurrentSheet: (sheet: ResListCurrentSheetDto) => void;
    clearCurrentSheet: () => void;
}

const useCurrentSheetStore = create<CurrentSheetStoreState>()(
    persist(
        (set) => ({
            currentSheet: null,
            setCurrentSheet: (sheet: ResListCurrentSheetDto) => {
                const transformedSheet = {
                    ...sheet,
                    data: sheet.data.map((item) => ({
                        ...item,
                        balance: item.balance, // Ensure `balance` is a number
                    })),
                };
                console.log("Transformed data being set in store:", transformedSheet); // Debug transformed data
                set(() => ({ currentSheet: transformedSheet }));
            },
            clearCurrentSheet: () => set(() => ({ currentSheet: null })),
        }),
        {
            name: "current-sheet-store", // Key to store in session storage
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

export default useCurrentSheetStore;