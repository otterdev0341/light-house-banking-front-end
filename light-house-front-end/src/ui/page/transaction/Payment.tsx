import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import PaymentTable from "../../data_table/payment_table";
import { PaymentService } from "../../../service/transaction/payment_service";
import usePaymentStore from "../../../store/payment_store";
import useContactStore from "../../../store/contact_store";
import useExpenseStore from "../../../store/expense_store";
import useAssetStore from "../../../store/asset_store";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import type { ReqCreatePaymentDto, ReqUpdatePaymentDto } from "../../../domain/dto/transaction/payment_dto";
import { TransactionTypeService } from "../../../service/transaction/transaction_type_service";
import { CurrentSheetService } from "../../../service/current_sheet_service";




const PaymentPage: React.FC = () => {

    // state definition
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const payment_store = usePaymentStore((state) => state.payments);
    const contact_store = useContactStore((state) => state.contacts);
    const expense_store = useExpenseStore((state) => state.expenses);
    const asset_store = useAssetStore((state) => state.assets);
    const current_sheet_service = CurrentSheetService.getInstance();

    const [newPayment, setNewPayment] = useState<ReqCreatePaymentDto>({
        transaction_type_id: "",
        amount: 0,
        asset_id: "",
        expense_id: "",
        contact_id: "",
        note: "",
        created_at: new Date().toISOString(),
    })


    // helper funtion defenition

    const handleCreatePayment = () => {
        setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
    };
    const handle_new_payment_change = (field: keyof ReqCreatePaymentDto, value: any) => {
            setNewPayment((prev) => ({
                ...prev,
                [field]: value, // Dynamically update the field in the state
        }));
    };

    const set_new_payment_blank = () => {
        setNewPayment({
            transaction_type_id: "",
            amount: 0,
            asset_id: "",
            expense_id: "",
            contact_id: "",
            note: "",
            created_at: new Date().toISOString(),
        });
    };

    const handle_create_payment = async () => {
        const payment_service = PaymentService.getInstance();
        const transaction_type_service = TransactionTypeService.getInstance();
        try {
            // Fetch the transaction type ID for "Payment"
            const payment_trans_id = await transaction_type_service.getTransactionTypeId("Payment");
            if (!payment_trans_id) {
                throw new Error("Failed to fetch transaction type ID for Income.");
            }

            // Update the transaction_type_id in the newPayment object
            setNewPayment((prev) => ({
                ...prev,
                transaction_type_id: payment_trans_id ,
            }));
            console.log("Create new payment with :", newPayment);
            // Wait for the state update to complete before proceeding
            const result = await payment_service.createPayment({
                ...newPayment,
                transaction_type_id: payment_trans_id, // Ensure the correct ID is sent
            });
            if (result.id !== null) {
                console.log("Payment created successfully:", result);
            }

            // Reset the new income state after creation
            set_new_payment_blank();
            await payment_service.getPaymentList(); // Refresh the payment list
            console.log("Payment list refreshed successfully");
        } catch (error) {
            console.error("Error fetching transaction type ID:", error);
            return;
        } finally {
            setIsPaymentModalOpen(false); // Close the modal after creation
        }
    }


    const handle_update_payment = async (update_dto: ReqUpdatePaymentDto & { id: string }) => {
        const payment_service = PaymentService.getInstance();

        try {
            // Call the service to update the payment
            const result = await payment_service.updatePayment(update_dto.id, {
                amount: update_dto.amount,
                asset_id: update_dto.asset_id,
                expense_id: update_dto.expense_id,
                contact_id: update_dto.contact_id,
                note: update_dto.note,
                created_at: update_dto.created_at,
            });
            await current_sheet_service.getCurrentSheet();
            if (result.id) {
                console.log("Payment updated successfully:", result);

                // Refresh the payment list after the update
                await payment_service.getPaymentList();
            }
        } catch (error) {
            console.error("Failed to update payment:", error);
        }
    };

    const handle_delete_payment = async (paymentId: string) => {
        const payment_service = PaymentService.getInstance();

        try {
            // Call the service to delete the payment
            await payment_service.deletePayment(paymentId);
            console.log("Payment deleted successfully:", paymentId);

            // Refresh the payment list after deletion
            await payment_service.getPaymentList();
        } catch (error) {
            console.error("Failed to delete payment:", error);
        }
    }

    // fetch on mount
    useEffect(() => {
        const fetchPayment = async () => {
            const payment_service = PaymentService.getInstance();
            try {
                await payment_service.getPaymentList();
                console.log("Payment data fetched successfully");
            }
            catch (error) {
                console.error("Error fetching payment data:", error);
            }
        }
        fetchPayment();
    },[]);


    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={0}>
                    <Tab label="Payment Records" />
                </Tabs>
            </Box>

            {/* Payment Section */}
            <Box sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Payment Records</h2>
                    <Button variant="contained" color="primary" onClick={handleCreatePayment}>
                        Create New Payment
                    </Button>
                </div>
                <PaymentTable
                    data={payment_store?.data || []} // Pass the payment data from the store
                    onEdit={(payment) => handle_update_payment(payment)} // Pass the update handler
                    onDelete={(paymentId) => handle_delete_payment(paymentId)} // Pass the delete handler
                />
            </Box>

            {/* Modal for Creating Payment */}
            <Dialog open={isPaymentModalOpen} onClose={handleClosePaymentModal}>
                <DialogTitle>Create New Payment</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(newPayment.created_at)} // Bind to `newIncome.created_at`
                            onChange={(newValue) => {
                                if (newValue) {
                                    handle_new_payment_change("created_at", newValue.toISOString()); // Update `created_at`
                                }
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                        />
                    </LocalizationProvider>
                    <TextField 
                        label="Amount" 
                        type="number" 
                        fullWidth 
                        margin="normal" 
                        onChange={(e) => handle_new_payment_change("amount", parseFloat(e.target.value))}
                        required={true} 
                    />
                    <Autocomplete
                        options={expense_store?.data || []} // Use expenses from the store
                        getOptionLabel={(option) => option.description} // Display the name of the expense
                        onChange={(event, value) => handle_new_payment_change("expense_id", value?.id || "")} // Update `expense_name`
                        renderInput={(params) => (
                            <TextField {...params} label="Expense" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        options={asset_store?.data || []} // Use assets from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset
                        onChange={(event, value) => handle_new_payment_change("asset_id", value?.id || "")} // Update `asset_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Asset" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        options={contact_store?.data || []} // Use contacts from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact
                        onChange={(event, value) => handle_new_payment_change("contact_id", value?.id || "")} // Update `contact_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Contact" fullWidth margin="normal" required />
                        )}
                    />
                    <TextField
                        label="Note"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        onChange={(e) => handle_new_payment_change("note", e.target.value)}
                        required={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePaymentModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_payment()} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PaymentPage;