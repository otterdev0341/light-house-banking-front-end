import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResEntryPaymentDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    expense_name: string;
    contact_name: string;
    asset_name: string;
    note: string;
    created_at: string;
    updated_at: string;
}

export interface ResListPaymentDto {
    length: number;
    data: ResEntryPaymentDto[];
}

interface PaymentStoreState {
    payments: ResListPaymentDto | null;
    setPayments: (payments: ResListPaymentDto) => void;
    clearPayments: () => void;
}

const usePaymentStore = create<PaymentStoreState>()(
    persist(
        (set) => ({
            payments: null,
            setPayments: (payments: ResListPaymentDto) => set(() => ({ payments })),
            clearPayments: () => set(() => ({ payments: null })),
        }),
        {
            name: "payment-store", // Key to store in session storage
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

export default usePaymentStore;