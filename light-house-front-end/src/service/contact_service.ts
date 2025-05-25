import type { ResListContactDto } from "../domain/dto/contact_dto";
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
    }
}