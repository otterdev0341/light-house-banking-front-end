import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListContactDto } from "../domain/dto/contact_dto";


interface ContactStoreState {
    contacts: ResListContactDto | null;
    setContacts: (contacts: ResListContactDto) => void;
    clearContacts: () => void;
}

const useContactStore = create<ContactStoreState>()(
    persist(
        (set) => ({
            contacts: null,
            setContacts: (contacts: ResListContactDto) => set(() => ({ contacts })),
            clearContacts: () => set(() => ({ contacts: null })),
        }),
        {
            name: "contact-store", // Key to store in session storage
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

// Selector to get only the contact data
export const useContactData = () => useContactStore((state) => state.contacts);

export default useContactStore;