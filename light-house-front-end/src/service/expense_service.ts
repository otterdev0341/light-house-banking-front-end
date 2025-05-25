import type { ReqCreateExpenseDto, ReqUpdateExpenseDto, ResEntryExpenseDto, ResListExpenseDto } from "../domain/dto/expense_dto";
import useExpenseStore from "../store/expense_store";
import useTokenStore from "../store/token_store";
import { UrlManagement } from "../utility/url_management";


export class ExpenseService {
    private static instalnce: ExpenseService;
    private constructor() {}
    public static getInstance(): ExpenseService {
        if (!ExpenseService.instalnce) {
            ExpenseService.instalnce = new ExpenseService();
        }
        return ExpenseService.instalnce;
    }// end getInstance

    public async getExpenseList(): Promise<void> {
        // initial
        const base_url = UrlManagement.getBaseExpense();
        const user_token = useTokenStore.getState().token;
        const expense_store = useExpenseStore.getState();

        // start fetch
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`, // Assuming you have a token store
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching expense list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }
            const data = await response.json();
            const expenseListDto = data.data as ResListExpenseDto;
            expense_store.setExpenses(expenseListDto);
            console.log("Expense list fetched successfully:", expenseListDto);
        } catch (error) {
            console.error("Error fetching expense list:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end getExpenseList

    public async createExpense(expense_dto: ReqCreateExpenseDto): Promise<ResEntryExpenseDto> {
        const base_url = UrlManagement.getBaseExpense();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(expense_dto),
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
            return data.data as ResEntryExpenseDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error creating expense:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end createExpense
    public async is_exist(description: String): Promise<boolean> {
        // Check if the expense types are already loaded in the store
        if (!description || description.trim() === "") {
            return false; // Invalid name
        }
        // Get the expense type store state
        const expense_type_store = useExpenseStore.getState();
        if (!expense_type_store.expenses || !expense_type_store.expenses.data) {
            return false; // No expense types available
        }
        // Check if the name exists in the expense types
        return expense_type_store.expenses.data.some((each) => each.description === description);
    } // end is_exist


    public async update_expense(expense_id: string, expense_dto: ReqUpdateExpenseDto): Promise<ResEntryExpenseDto> {
        const base_url = UrlManagement.getBaseExpense() + `/${expense_id}`;
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(expense_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating expense: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data as ResEntryExpenseDto; // Assuming the response structure matches your DTO
        } catch (error) {
            console.error("Error updating expense:", error);
            throw error; // Re-throw the error for further handling
        }
    }// end update_expense
    public async delete_expense(expense_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseExpense() + `/${expense_id}`;
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
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error deleting expense: ${response.statusText}`);
            }
            console.log("Expense deleted successfully.");
        } catch (error) {
            console.error("Error deleting expense:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end delete_expense

} // end class ExpenseService