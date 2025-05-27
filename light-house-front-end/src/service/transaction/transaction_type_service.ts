import type { ResEntryTransactionTypeDto } from "../../domain/dto/transaction/transaction_type_dto";
import useTokenStore from "../../store/token_store";
import useTransactionTypeStore, { type ResListTransactionTypeDto } from "../../store/transaction_type_store";
import { UrlManagement } from "../../utility/url_management";


type SelectTransactionType = "Income" | "Payment" | "Transfer";


export class TransactionTypeService {
    private static instance: TransactionTypeService;

    private constructor() {}

    public static getInstance(): TransactionTypeService {
        if (!TransactionTypeService.instance) {
            TransactionTypeService.instance = new TransactionTypeService();
        }
        return TransactionTypeService.instance;
    } // end getInstance

    // Add methods for fetching, creating, updating, and deleting transaction types here
    public async getTransactionTypeList(): Promise<void> {
        // initial
        const base_url = UrlManagement.getBaseTransactionType();
        const user_token = useTokenStore.getState().token;
        const transactionTypeStore = useTransactionTypeStore.getState();

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
                throw new Error(`Error fetching transaction type list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }
            const data = await response.json();
            const dto = data.data as ResListTransactionTypeDto; // Assuming the response structure contains a 'data' field
            transactionTypeStore.setTransactionTypes(dto);
            console.log("Transaction type list fetched successfully:", data.data);
        } catch (error) {
            console.error("Error fetching transaction type list:", error);
            throw error; // Re-throw the error for further handling
        }


    } // end getTransactionTypeList


    public async getTransactionTypeId(selection: SelectTransactionType): Promise<string> {
        const transactionTypeStore = useTransactionTypeStore.getState();
        let result_id = null;

        // Check if transactionTypes is null or empty
        if (!transactionTypeStore.transactionTypes || transactionTypeStore.transactionTypes.length === 0) {
            // If the transaction types are not loaded, fetch them first
            await this.getTransactionTypeList();
        }

        // Re-fetch the updated transaction types from the store
        const transactionTypes = transactionTypeStore.transactionTypes?.data || [];

        // Use a switch statement to find the transaction type by name
        switch (selection) {
            case "Income":
                result_id = transactionTypes.find((type) => type.name.toLowerCase() === "income")?.id;
                break;
            case "Payment":
                result_id = transactionTypes.find((type) => type.name.toLowerCase() === "payment")?.id;
                break;
            case "Transfer":
                result_id = transactionTypes.find((type) => type.name.toLowerCase() === "transfer")?.id;
                break;
            default:
                throw new Error(`Invalid transaction type selection: ${selection}`);
        }

        // Throw an error if the transaction type is not found
        if (!result_id) {
            throw new Error(`Transaction type '${selection}' not found`);
        }

        return result_id as ResEntryTransactionTypeDto["id"];
    } // end getIncomeTransactionTypeId
}

