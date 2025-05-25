import type { ResListContactTypeDto } from "../domain/dto/contact_type_dto";
import useContactTypeStore from "../store/contact_type_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";




export class ContactTypeService {
    private static instance: ContactTypeService;
    private constructor() {}
    public static getInstance(): ContactTypeService {
        if (!ContactTypeService.instance) {
            ContactTypeService.instance = new ContactTypeService();
        }
        return ContactTypeService.instance;
    } // end getInstance
    // Add methods for fetching contact types, similar to the ContactService
    public async getContactTypeList(): Promise<void> {
        // Initial setup
        const base_url = UrlManagement.getBaseContactType();
        const user_token = useTokenStore.getState().token;
        const contact_type_store = useContactTypeStore.getState();
        // Start fetch
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
                },
            });
            // handle response
            if (!response.ok) {
                throw new Error(`Error fetching contact type list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }
            // convert response to json and set to store
            const data = await response.json();
            const contactTypeListDto = data.data as ResListContactTypeDto; // Assuming the response structure matches your DTO
            contact_type_store.setContactTypes(contactTypeListDto);
        } catch (error) {
            console.error("Error fetching contact type list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end getContactTypeList

    
}