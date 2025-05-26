import type { ReqCreateIncomeDto, ReqUpdateIncomeDto } from "../../domain/dto/transaction/income_dto";
import useIncomeStore, { type ResEntryIncomeDto, type ResListIncomeDto } from "../../store/income_store";
import useTokenStore from "../../store/token_store";
import { UrlManagement } from "../../utility/url_management";





export class IncomeService {
    private static instance: IncomeService;
    private constructor() {}

    public static getInstance(): IncomeService {
        if (!IncomeService.instance) {
            IncomeService.instance = new IncomeService();
        }
        return IncomeService.instance;
    } // end getInstance

    // Add methods for fetching, creating, updating, and deleting income records here

    public async getIncomeList(): Promise<void> {
        // initial
        const base_url = UrlManagement.getBaseIncome();
        const user_token = useTokenStore.getState().token;
        const income_store = useIncomeStore.getState();

        // start fetch
        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching income list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }
            const data = await response.json();
            const incomeListDto = data.data as ResListIncomeDto;
            income_store.setIncomes(incomeListDto);
            console.log("Income list fetched successfully:", incomeListDto);
        } catch (error) {
            console.error("Error fetching income list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end getIncomeList

    public async createIncome(income_dto: ReqCreateIncomeDto): Promise<ResEntryIncomeDto> {
        const base_url = UrlManagement.getBaseIncome();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(income_dto),
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
            console.log("Income created successfully:", data);
            return data.data as ResEntryIncomeDto; // Return the created income data
        } catch (error) {
            console.error("Error creating income:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end createIncome


    public async updateIncome(transaction_id: string, income_dto: ReqUpdateIncomeDto): Promise<ResEntryIncomeDto> {
        const base_url = UrlManagement.getBaseIncome();
        const user_token = useTokenStore.getState().token;
        
        try {
            const response = await fetch(`${base_url}/${transaction_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(income_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating income: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Income updated successfully:", data);
            return data.data as ResEntryIncomeDto; // Return the updated income data
        } catch (error) {
            console.error("Error updating income:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end updateIncome

    public async deleteIncome(transaction_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseIncome();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(`${base_url}/${transaction_id}`, {
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
                throw new Error(`Error deleting income: ${response.statusText}`);
            }

            console.log("Income deleted successfully.");
        } catch (error) {
            console.error("Error deleting income:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end deleteIncome

} // end IncomeService