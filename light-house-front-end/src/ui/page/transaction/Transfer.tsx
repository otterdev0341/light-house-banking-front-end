import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Autocomplete } from "@mui/material";
import TransferTable from "../../data_table/transfer_table";
import { TransferService } from "../../../service/transaction/transfer_service";
import useTokenStore from "../../../store/token_store";
import useTransferStore from "../../../store/transfer_store";
import useContactStore from "../../../store/contact_store";
import useAssetStore from "../../../store/asset_store";
import type { ReqCreateTransferDto, ReqUpdateTransferDto } from "../../../domain/dto/transaction/transfer_dto";
import { TransactionTypeService } from "../../../service/transaction/transaction_type_service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CurrentSheetService } from "../../../service/current_sheet_service";



const TransferPage: React.FC = () => {
    
    const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
    const token_store = useTokenStore().token;
    const transfer_store = useTransferStore((state) => state.transfers);
    const contact_store = useContactStore((state) => state.contacts);
    const asset_store = useAssetStore((state) => state.assets);
    const current_sheet_service = CurrentSheetService.getInstance();
    const [newTransfer, setNewTransfer] = useState<ReqCreateTransferDto>({
        transaction_type_id: "",
        amount: 0,
        asset_id: "",
        destination_asset_id: "",
        contact_id: "",
        note: "",
        created_at: new Date().toISOString(),
    })


    // helper funtion definition
    const handleCreateTransfer = () => {
        setIsTransferModalOpen(true);
    };

    const handleCloseTransferModal = () => {
        setIsTransferModalOpen(false);
    };

    const handle_new_transfer_change = (field: keyof ReqCreateTransferDto, value: any) => {
        setNewTransfer((prev) => ({
            ...prev,
            [field]: value, // Dynamically update the field in the state
        }));
    };

    const set_new_transfer_blank = () => {
        setNewTransfer({
            transaction_type_id: "",
            amount: 0,
            asset_id: "",
            destination_asset_id: "",
            contact_id: "",
            note: "",
            created_at: new Date().toISOString(),
        })
    }

    const handle_create_transfer = async () => {
        // init services
        const transfer_service = TransferService.getInstance();
        const transaction_type_service = TransactionTypeService.getInstance();
        try {

            const transfer_type_id = await transaction_type_service.getTransactionTypeId("Transfer");
            if (!transfer_type_id) {
                throw new Error("Failed to fetch transaction type ID for Transfer.");
            }

            // update the new transfer with the transaction type ID
            setNewTransfer((prev) => ({
                ...prev,
                transaction_type_id: transfer_type_id,
            }));
            // create transfer
            console.log("Creating transfer with data:", newTransfer);
            const result = await transfer_service.createTransfer({
                ...newTransfer,
                transaction_type_id: transfer_type_id, // Ensure the transaction type ID is set
            });
            if (result.id !== null) {
                console.log("Transfer created successfully:", result);
                // handle success, e.g., show a notification or update the UI
            }
            await transfer_service.getTransferList(); // Refresh the transfer list after creation
            await current_sheet_service.getCurrentSheet(); // Refresh the current sheet after creation
        }catch (e) {
            console.error("Error creating transfer:", e);
            // handle error, e.g., show a notification
            return;
        } finally{
            // close modal
            setIsTransferModalOpen(false);
            // reset new transfer state
            set_new_transfer_blank();
        }
    }

    const handle_update_transfer = async (update_dto: ReqUpdateTransferDto & {id: string}) => {
        const transfer_service = TransferService.getInstance();
        try {
            // Update the transfer with the provided ID
            const result = await transfer_service.updateTransfer(update_dto.id, {
                amount: update_dto.amount,
                asset_id: update_dto.asset_id,
                destination_asset_id: update_dto.destination_asset_id,
                contact_id: update_dto.contact_id,
                note: update_dto.note,
                created_at: update_dto.created_at,
            });
            await transfer_service.getTransferList(); // Refresh the transfer list after update
            if (result.id !== null) {
                console.log("Transfer updated successfully:", result);
                // handle success, e.g., show a notification or update the UI
            }
            await current_sheet_service.getCurrentSheet(); // Refresh the current sheet after update
        } catch (e) {
            console.error("Error updating transfer:", e);
            // handle error, e.g., show a notification
            
        }
    }

    const handle_delete_transfer = async (transferId: string) => {
        const transfer_service = TransferService.getInstance();
        try {
            // Call the service to delete the transfer
            await transfer_service.deleteTransfer(transferId);
            console.log("Transfer deleted successfully:", transferId);
            await transfer_service.getTransferList(); // Refresh the transfer list after deletion
            await current_sheet_service.getCurrentSheet(); // Refresh the current sheet after deletion
        } catch (error) {
            console.error("Error deleting transfer:", error);
            // handle error, e.g., show a notification
        }
    }


    // load data from store
    useEffect(() => {
        const fetchTransfer = async () => {
            const transfers_service = await TransferService.getInstance();
            try {
                await transfers_service.getTransferList();
                console.log("Transfers fetched successfully");
            } catch (error) {
                console.error("Error fetching transfers:", error);
            }
        }
        fetchTransfer();
    },[token_store]);


    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={0}>
                    <Tab label="Transfer Records" />
                </Tabs>
            </Box>

            {/* Transfer Section */}
            <Box sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Transfer Records</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateTransfer}>
                        Create New Transfer
                    </Button>
                </div>
                <TransferTable
                    data={transfer_store?.data || []}
                    onEdit={(transfer) => handle_update_transfer(transfer)}
                    onDelete={(transferId) => handle_delete_transfer(transferId)}
                />
            </Box>

            {/* Modal for Creating Transfer */}
            <Dialog open={isTransferModalOpen} onClose={handleCloseTransferModal}>
                <DialogTitle>Create New Transfer</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(newTransfer.created_at)} // Bind to `newIncome.created_at`
                            onChange={(newValue) => {
                                if (newValue) {
                                    handle_new_transfer_change("created_at", newValue.toISOString()); // Update `created_at`
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
                        required={true}
                        onChange={(e) => handle_new_transfer_change("amount", parseFloat(e.target.value))}
                    />
                    
                    <Autocomplete
                        options={asset_store?.data || []} // Use assets from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset
                        onChange={(event, value) => handle_new_transfer_change("asset_id", value?.id)} // Update `asset_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Source Asset" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        aria-label=""
                        options={asset_store?.data || []} // Use assets from the store
                        getOptionLabel={(option) => option.name} // Display the name of the asset
                        onChange={(event, value) => handle_new_transfer_change("destination_asset_id", value?.id)} // Update `asset_id`
                        renderInput={(params) => (
                            <TextField {...params} label="Destination Asset" fullWidth margin="normal" required />
                        )}
                    />
                    <Autocomplete
                        options={contact_store?.data || []} // Use contacts from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact
                        onChange={(event, value) => handle_new_transfer_change("contact_id", value?.id)} // Update `contact_id`
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
                        onChange={(e) => handle_new_transfer_change("note", e.target.value)}
                        required={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTransferModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_transfer()} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TransferPage;