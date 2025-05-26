import type { ReqUpdateContactTypeDto, ResEntryContactTypeDto, ResListContactTypeDto } from "../domain/dto/contact_type_dto";
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

    public async is_exist(name: String): Promise<boolean> {
        // check is contact type exist in the store
        if (!name || name.trim() === "") {
            return false; // Invalid name
        }

        // Get the contact type store state
        const contact_type_store = useContactTypeStore.getState();
        if (!contact_type_store.contactTypes || !contact_type_store.contactTypes.data) {
            return false; // No contact types loaded
        }

        // Check if the name exists in the contact types
        return contact_type_store.contactTypes.data.some((contactType) => contactType.name.toLowerCase() === name.toLowerCase());

    }// end is_exist

    public async updateContactType(target_contact_type_id: string, contact_type: ReqUpdateContactTypeDto): Promise<ResEntryContactTypeDto> {
        const base_url = UrlManagement.getBaseContactType() + `/${target_contact_type_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(contact_type),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating expense type: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryContactTypeDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error updating contact type:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end updateContactType

    public async deleteContactType(target_contact_type_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseContactType() + `/${target_contact_type_id}`;
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
                throw new Error("Expense type not found.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error deleting expense type: ${response.statusText}`);
            }
            
        } catch (error) {
            console.error("Error deleting contact type:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end deleteContactType

    public async create_contact_type(contact_type: ReqUpdateContactTypeDto): Promise<ResEntryContactTypeDto> {
        const base_url = UrlManagement.getBaseContactType();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(contact_type),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 201) {
                throw new Error(`Error creating contact type: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryContactTypeDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error creating contact type:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end create_contact_type
    
}