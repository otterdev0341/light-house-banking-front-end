import type { ReqCreatePaymentDto, ReqUpdatePaymentDto } from "../../domain/dto/transaction/payment_dto";
import usePaymentStore, { type ResEntryPaymentDto, type ResListPaymentDto } from "../../store/payment_store";
import useTokenStore from "../../store/token_store";
import { UrlManagement } from "../../utility/url_management";

export class PaymentService {
    private static instance: PaymentService;
    private constructor() {}

    public static getInstance(): PaymentService {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    } // end getInstance

    // Fetch the list of payments
    public async getPaymentList(): Promise<void> {
        const base_url = UrlManagement.getBasePayment();
        const user_token = useTokenStore.getState().token;
        const payment_store = usePaymentStore.getState();

        try {
            const response = await fetch(base_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching payment list: ${response.statusText}`);
            } else if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            }

            const data = await response.json();
            const paymentListDto = data.data as ResListPaymentDto;
            payment_store.setPayments(paymentListDto);
            console.log("Payment list fetched successfully:", paymentListDto);
        } catch (error) {
            console.error("Error fetching payment list:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end getPaymentList

    // Create a new payment
    public async createPayment(payment_dto: ReqCreatePaymentDto): Promise<ResEntryPaymentDto> {
        const base_url = UrlManagement.getBasePayment();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(base_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(payment_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 201) {
                throw new Error(`Error creating payment: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Payment created successfully:", data);
            return data.data as ResEntryPaymentDto; // Return the created payment data
        } catch (error) {
            console.error("Error creating payment:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end createPayment

    // Update an existing payment
    public async updatePayment(transaction_id: string, payment_dto: ReqUpdatePaymentDto): Promise<ResEntryPaymentDto> {
        const base_url = UrlManagement.getBasePayment();
        const user_token = useTokenStore.getState().token;

        try {
            const response = await fetch(`${base_url}/${transaction_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_token}`,
                },
                body: JSON.stringify(payment_dto),
            });

            if (response.status === 401) {
                throw new Error("Unauthorized access. Please log in again.");
            } else if (response.status === 400) {
                throw new Error("Bad request. Please check the data you are sending.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else if (response.status !== 200) {
                throw new Error(`Error updating payment: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Payment updated successfully:", data);
            return data.data as ResEntryPaymentDto; // Return the updated payment data
        } catch (error) {
            console.error("Error updating payment:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end updatePayment

    // Delete a payment
    public async deletePayment(transaction_id: string): Promise<void> {
        const base_url = UrlManagement.getBasePayment();
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
                throw new Error(`Error deleting payment: ${response.statusText}`);
            }

            console.log("Payment deleted successfully.");
        } catch (error) {
            console.error("Error deleting payment:", error);
            throw error; // Re-throw the error for further handling
        }
    } // end deletePayment
} // end PaymentService