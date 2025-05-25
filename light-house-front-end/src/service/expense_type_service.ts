import type { ReqUpdateAssestTypeDto } from "../domain/dto/asset_type_dto";
import type { ReqCreateExpenseTypeDto, ResEntryExpenseTypeDto, ResListExpenseTypeDto } from "../domain/dto/expense_type_dto";
import useExpenseTypeStore from "../store/expense_type_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";





export class ExpenseTypeService {
    private static instance: ExpenseTypeService;

    private constructor() {}

    public static getInstance(): ExpenseTypeService {
        if (!ExpenseTypeService.instance) {
            ExpenseTypeService.instance = new ExpenseTypeService();
        }
        return ExpenseTypeService.instance;
    } // end getInstance

    // Add methods for fetching expense types, similar to the ExpenseService
    public async getExpenseTypeList(): Promise<void> {
        // Initial setup
        const base_url = UrlManagement.getBaseExpenseType();
        const user_token = useTokenStore.getState().token;
        const expense_type_store = useExpenseTypeStore.getState();
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
                throw new Error(`Error fetching expense list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }
            // convert response to json and set to store
            const data = await response.json();
            const expenseTypeListDto = data.data as ResListExpenseTypeDto // Assuming the response structure matches your DTO
            expense_type_store.setExpenseTypes(expenseTypeListDto);
        }catch (error) {
            console.error("Error fetching expense type list:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end getExpenseTypeList

    public async createExpenseType(expenseType: ReqCreateExpenseTypeDto): Promise<ResEntryExpenseTypeDto> {
        const base_url = UrlManagement.getBaseExpenseType();
        const user_token = useTokenStore.getState().token;
        

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(expenseType),
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
            const dto = data.data as ResEntryExpenseTypeDto; // Assuming the response structure matches your DTO
            
            return dto;
            
        } catch (error) {
            console.error("Error creating expense type:", error);
            throw error;
        }
    } // end createExpenseType

    public async is_exist(name: String): Promise<boolean> {
        // Check if the expense types are already loaded in the store
        if (!name || name.trim() === "") {
            return false; // Invalid name
        }
        // Get the expense type store state
        const expense_type_store = useExpenseTypeStore.getState();
        if (!expense_type_store.expenseTypes || !expense_type_store.expenseTypes.data) {
            return false; // No expense types available
        }
        // Check if the name exists in the expense types
        return expense_type_store.expenseTypes.data.some((type) => type.name === name);
    } // end is_exist

    public async updateExpenseType(target_asset_type_id: string, expenseType: ReqUpdateAssestTypeDto): Promise<ResEntryExpenseTypeDto> {
        const base_url = UrlManagement.getBaseExpenseType() + `/${target_asset_type_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(expenseType),
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
            const dto = data.data as ResEntryExpenseTypeDto; // Assuming the response structure matches your DTO
            
            return dto;
            
        } catch (error) {
            console.error("Error updating expense type:", error);
            throw error;
        }
    }// end updateExpenseType

    public async deleteExpenseType(target_asset_type_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseExpenseType() + `/${target_asset_type_id}`;
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
            console.error("Error deleting expense type:", error);
            throw error;
        }
    }

}// end class ExpenseTypeService