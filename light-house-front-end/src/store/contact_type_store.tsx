import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResListContactTypeDto } from "../domain/dto/contact_type_dto";



interface ContactTypeStoreState {
    contactTypes: ResListContactTypeDto | null;
    setContactTypes: (contactTypes: ResListContactTypeDto) => void;
    clearContactTypes: () => void;
}

const useContactTypeStore = create<ContactTypeStoreState>()(
    persist(
        (set) => ({
            contactTypes: null,
            setContactTypes: (contactTypes: ResListContactTypeDto) => set(() => ({ contactTypes })),
            clearContactTypes: () => set(() => ({ contactTypes: null })),
        }),
        {
            name: "contact-type-store", // Key to store in session storage
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

export default useContactTypeStore;