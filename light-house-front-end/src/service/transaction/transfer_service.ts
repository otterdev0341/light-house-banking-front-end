import type { ReqCreateTransferDto, ReqUpdateTransferDto } from "../../domain/dto/transaction/transfer_dto";
import useTransferStore, { type ResEntryTransferDto, type ResListTransferDto } from "../../store/transfer_store";
import useTokenStore from "../../store/token_store";
import { UrlManagement } from "../../utility/url_management";

export class TransferService {
    private static instance: TransferService;
    private constructor() {}

    public static getInstance(): TransferService {
        if (!TransferService.instance) {
            TransferService.instance = new TransferService();
        }
        return TransferService.instance;
    } // end getInstance

    // Fetch the list of transfers
    public async getTransferList(): Promise<void> {
        const base_url = UrlManagement.getBaseTransfer();
        const user_token = useTokenStore.getState().token;
        const transfer_store = useTransferStore.getState();

        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching transfer list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            const data = await response.json();
            const transferListDto = data.data as ResListTransferDto;
            transfer_store.setTransfers(transferListDto);
            console.log("Transfer list fetched successfully:", transferListDto);
        } catch (error) {
            console.error("Error fetching transfer list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end getTransferList

    // Create a new transfer
    public async createTransfer(transfer_dto: ReqCreateTransferDto): Promise<ResEntryTransferDto> {
        const base_url = UrlManagement.getBaseTransfer();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(transfer_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 201) {
                throw new Error(`Error creating transfer: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Transfer created successfully:", data);
            return data.data as ResEntryTransferDto; // Return the created transfer data
        } catch (error) {
            console.error("Error creating transfer:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end createTransfer

    // Update an existing transfer
    public async updateTransfer(transaction_id: string, transfer_dto: ReqUpdateTransferDto): Promise<ResEntryTransferDto> {
        const base_url = UrlManagement.getBaseTransfer();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(`${base_url}/${transaction_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(transfer_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating transfer: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Transfer updated successfully:", data);
            return data.data as ResEntryTransferDto; // Return the updated transfer data
        } catch (error) {
            console.error("Error updating transfer:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end updateTransfer

    // Delete a transfer
    public async deleteTransfer(transaction_id: string): Promise<void> {
        const base_url = UrlManagement.getBaseTransfer();
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
                throw new Error(`Error deleting transfer: ${response.statusText}`);
            }

            console.log("Transfer deleted successfully.");
        } catch (error) {
            console.error("Error deleting transfer:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end deleteTransfer
} // end TransferService