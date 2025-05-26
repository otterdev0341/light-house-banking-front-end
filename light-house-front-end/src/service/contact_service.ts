import type { ReqCreateContactDto, ReqUpdateContactDto, ResEntryContactDto, ResListContactDto } from "../domain/dto/contact_dto";
import useContactStore from "../store/contact_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";





export class ContactService {
    private static instance: ContactService;

    private constructor() {}

    public static getInstance(): ContactService {
        if (!ContactService.instance) {
            ContactService.instance = new ContactService();
        }
        return ContactService.instance;
    }

    public async getContacts(): Promise<void> { 
        // Initial setup
        const base_url = UrlManagement.getBaseContact();
        const user_token = useTokenStore.getState().token;
        const contact_store = useContactStore.getState();

        // Start fetch
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
                },
            });

            // Handle response
            if (!response.ok) {
                throw new Error(`Error fetching contact list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            // Convert response to json and set to store
            const data = await response.json();
            const contactListDto = data.data as ResListContactDto; // Assuming the response structure matches your DTO
            contact_store.setContacts(contactListDto);
        } catch (error) {
            console.error("Error fetching contact list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // enc getContacts

    public async createContact(contact_dto: ReqCreateContactDto): Promise<ResEntryContactDto> {
        const base_url = UrlManagement.getBaseContact();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(contact_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 201) {
                throw new Error(`Error creating expense type: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryContactDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error creating contact:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end createContact


    public async is_exist(contact_name: String): Promise<boolean> {
        // Check if the contact name is provided and not empty
        if (!contact_name || contact_name.trim() === "") {
            return false; // Return false if the contact name is empty or only whitespace
        }

        
        const contact_store = useContactStore.getState();
        if (!contact_store.contacts || contact_store.contacts.length) {
            return false; // Return false if contacts are not loaded or empty
        }

        // Check if the name exists in the contact type
        return contact_store.contacts.data.some((contact) => contact.name.toLowerCase() === contact_name.toLowerCase());

    } // end is_exist

    public async update_contact(contact_id: String, contact_dto: ReqUpdateContactDto): Promise<ResEntryContactDto> {
        const base_url = UrlManagement.getBaseContact() + `/${contact_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(contact_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating contact: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryContactDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error updating contact:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end update_contact

    public async delete_contact(contact_id: String): Promise<void> {
        const base_url = UrlManagement.getBaseContact() + `/${contact_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 404) {
                throw new Error("Contact not found.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (!response.ok) {
                throw new Error(`Error deleting contact: ${response.statusText}`);
            }

            // Optionally, you can update the store or perform other actions after deletion
        } catch (error) {
            console.error("Error deleting contact:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end delete_contact

}
