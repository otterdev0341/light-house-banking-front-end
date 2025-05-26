import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import IncomeTable from "../../data_table/income_table";
import useIncomeStore from "../../../store/income_store";
import { IncomeService } from "../../../service/transaction/income_service";
import useContactStore from "../../../store/contact_store";
import useAssetStore from "../../../store/asset_store";
import Autocomplete from "@mui/material/Autocomplete";
import { TransactionTypeService } from "../../../service/transaction/transaction_type_service";
import type { ReqCreateIncomeDto, ReqUpdateIncomeDto } from "../../../domain/dto/transaction/income_dto";
import useTokenStore from "../../../store/token_store";




const IncomePage: React.FC = () => {
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
    // const [createdAt, setCreatedAt] = useState<string>(dayjs().toISOString()); // Default to today's date in ISO 8601 format
    const [selectedAsset, setSelectedAsset] = useState<string>("");
    const [selectedContact, setSelectedContact] = useState<string>("");
    const income_store = useIncomeStore((state) => state);
    const contact_store = useContactStore((state) => state);
    const asset_store = useAssetStore((state) => state);
    const token_store = useTokenStore((state) => state);
    const [newIncome, setNewIncome] = useState<ReqCreateIncomeDto>({
        transaction_type_id: "",
        amount: 0,
        asset_id: "",
        contact_id: "",
        note: "",
        created_at: dayjs().toISOString(), // Set to current date in ISO format
    });
    

    useEffect(() => {
        const fetchIncomes = async () => {
            const income_service = IncomeService.getInstance();
            const transaction_type_service = TransactionTypeService.getInstance();
            try {
                await transaction_type_service.getTransactionTypeList(); // Fetch transaction types
                await income_service.getIncomeList();
            } catch (error) {
                console.error("Failed to fetch incomes:", error);
            }
        }
        fetchIncomes();
    }, [token_store.token]); // Fetch incomes when the component mounts or token changes

    
    const handle_new_income_change = (field: keyof ReqCreateIncomeDto, value: any) => {
        setNewIncome((prev) => ({
            ...prev,
            [field]: value, // Dynamically update the field in the state
        }));
    };
    const set_new_income_blank = () => {
        setNewIncome({
            transaction_type_id: "",
            amount: 0,
            asset_id: "",
            contact_id: "",
            note: "",
            created_at: dayjs().toISOString(), // Set to current date in ISO format
        });
    };
    const handleCreateIncome = () => {
        setIsIncomeModalOpen(true);
    };

    const handleCloseIncomeModal = () => {
        setIsIncomeModalOpen(false);
    };

    const handle_create_income = async () => {
        const income_service = IncomeService.getInstance();
        const transaction_type_service = TransactionTypeService.getInstance();

        try {
            // Fetch the transaction type ID for "Income"
            const incom_trans_id = await transaction_type_service.getTransactionTypeId("Income");

            if (!incom_trans_id) {
                throw new Error("Failed to fetch transaction type ID for Income.");
            }

            // Update the transaction_type_id in the newIncome state
            setNewIncome((prev) => ({
                ...prev,
                transaction_type_id: incom_trans_id,
            }));

            // Wait for the state update to complete before proceeding
            const result = await income_service.createIncome({
                ...newIncome,
                transaction_type_id: incom_trans_id, // Ensure the correct ID is sent
            });

            if (result.id !== null) {
                console.log("Income created successfully:", result);
            }

            // Reset the new income state after creation
            set_new_income_blank();
        } catch (error) {
            console.error("Failed to create income:", error);
        } finally {
            setIsIncomeModalOpen(false);

            // Refresh the income list after creation
            await income_service.getIncomeList();
        }
    }

    const handle_update_income = async (update_dto: ReqUpdateIncomeDto & { id: string }) => {
        const income_service = IncomeService.getInstance();

        try {
            // Call the service to update the income
            const result = await income_service.updateIncome(update_dto.id, {
                amount: update_dto.amount,
                asset_id: update_dto.asset_id,
                contact_id: update_dto.contact_id,
                note: update_dto.note,
                created_at: update_dto.created_at,
            });

            if (result.id) {
                console.log("Income updated successfully:", result);

                // Refresh the income list after the update
                await income_service.getIncomeList();
            }
        } catch (error) {
            console.error("Failed to update income:", error);
        }
    }

    const handle_delete_income = async(income_id: string) => {
        const income_service = IncomeService.getInstance();

        try {
            // Call the service to delete the income
            await income_service.deleteIncome(income_id);
            console.log("Income deleted successfully:", income_id);

            // Refresh the income list after deletion
            await income_service.getIncomeList();
        } catch (error) {
            console.error("Failed to delete income:", error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={0}>
                    <Tab label="Income Records" />
                </Tabs>
            </Box>

            {/* Income Section */}
            <Box sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Income Records</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateIncome}>
                        Create New Income
                    </Button>
                </div>
                <IncomeTable
                    data={income_store.incomes || { length: 0, data: [] }}
                    onEdit={(updatedIncome) => handle_update_income(updatedIncome)} // Pass the handler
                    onDelete={(incomeId) => handle_delete_income(incomeId)} // Existing delete handler
                />
            </Box>

            {/* Modal for Creating Income */}
            <Dialog open={isIncomeModalOpen} onClose={handleCloseIncomeModal}>
                <DialogTitle>Create New Income</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(newIncome.created_at)} // Bind to `newIncome.created_at`
                            onChange={(newValue) => {
                                if (newValue) {
                                    handle_new_income_change("created_at", newValue.toISOString()); // Update `created_at`
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
                        required
                        value={newIncome.amount} // Bind to `newIncome.amount`
                        onChange={(e) => handle_new_income_change("amount", parseFloat(e.target.value) || 0)} // Update `amount`
                    />
                    <Autocomplete
                        options={asset_store.assets?.data || []} // Use assets from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset
                        value={asset_store.assets?.data.find((asset) => asset.id === newIncome.asset_id) || null} // Bind to `newIncome.asset_id`
                        onChange={(event, value) => handle_new_income_change("asset_id", value?.id || "")} // Update `asset_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Asset" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        options={contact_store.contacts?.data || []} // Use contacts from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact
                        value={contact_store.contacts?.data.find((contact) => contact.id === newIncome.contact_id) || null} // Bind to `newIncome.contact_id`
                        onChange={(event, value) => handle_new_income_change("contact_id", value?.id || "")} // Update `contact_id`
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
                        value={newIncome.note} // Bind to `newIncome.note`
                        onChange={(e) => handle_new_income_change("note", e.target.value)} // Update `note`
                        required={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIncomeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            console.log("New Income Data:", newIncome);
                            await handle_create_income(); // Call the API to create income
                        }}
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default IncomePage;