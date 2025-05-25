import type { ResListExpenseDto } from "../domain/dto/expense_dto";
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



} // end class ExpenseService