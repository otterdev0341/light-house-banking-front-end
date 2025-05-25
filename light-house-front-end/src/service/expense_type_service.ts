import type { ResListExpenseTypeDto } from "../domain/dto/expense_type_dto";
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

}// end class ExpenseTypeService