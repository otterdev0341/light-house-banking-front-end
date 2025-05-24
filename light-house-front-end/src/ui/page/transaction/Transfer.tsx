import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import TransferTable from "../../data_table/transfer_table";


const mockTransferData = {
    data: [
        {
            id: "1",
            transaction_type_name: "Internal Transfer",
            amount: 1000,
            asset_name: "Bank Account",
            destination_asset_name: "Savings Account",
            contact_name: "Self",
            note: "Monthly savings transfer",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            transaction_type_name: "External Transfer",
            amount: 500,
            asset_name: "Bank Account",
            destination_asset_name: "PayPal",
            contact_name: "Freelancer",
            note: "Payment for freelance work",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const TransferPage: React.FC = () => {
    const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);

    const handleCreateTransfer = () => {
        setIsTransferModalOpen(true);
    };

    const handleCloseTransferModal = () => {
        setIsTransferModalOpen(false);
    };

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
                    data={mockTransferData.data}
                    onEdit={(transfer) => console.log("Edit Transfer:", transfer)}
                    onDelete={(transferId) => console.log("Delete Transfer:", transferId)}
                />
            </Box>

            {/* Modal for Creating Transfer */}
            <Dialog open={isTransferModalOpen} onClose={handleCloseTransferModal}>
                <DialogTitle>Create New Transfer</DialogTitle>
                <DialogContent>
                    <TextField label="Transaction Type" fullWidth margin="normal" />
                    <TextField label="Amount" type="number" fullWidth margin="normal" />
                    <TextField label="Source Asset" fullWidth margin="normal" />
                    <TextField label="Destination Asset" fullWidth margin="normal" />
                    <TextField label="Contact" fullWidth margin="normal" />
                    <TextField label="Note" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTransferModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Transfer")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TransferPage;