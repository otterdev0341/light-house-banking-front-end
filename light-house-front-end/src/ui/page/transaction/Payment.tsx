import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import PaymentTable from "../../data_table/payment_table";


const mockPaymentData = {
    data: [
        {
            id: "1",
            transaction_type_name: "Utility Bill",
            amount: 150,
            expense_name: "Electricity",
            contact_name: "Utility Company",
            asset_name: "Bank Account",
            note: "Monthly electricity bill",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            transaction_type_name: "Office Rent",
            amount: 2000,
            expense_name: "Rent",
            contact_name: "Landlord",
            asset_name: "Bank Account",
            note: "Monthly office rent",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const PaymentPage: React.FC = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

    const handleCreatePayment = () => {
        setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
    };

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
                    data={mockPaymentData.data}
                    onEdit={(payment) => console.log("Edit Payment:", payment)}
                    onDelete={(paymentId) => console.log("Delete Payment:", paymentId)}
                />
            </Box>

            {/* Modal for Creating Payment */}
            <Dialog open={isPaymentModalOpen} onClose={handleClosePaymentModal}>
                <DialogTitle>Create New Payment</DialogTitle>
                <DialogContent>
                    <TextField label="Transaction Type" fullWidth margin="normal" />
                    <TextField label="Amount" type="number" fullWidth margin="normal" />
                    <TextField label="Expense" fullWidth margin="normal" />
                    <TextField label="Asset" fullWidth margin="normal" />
                    <TextField label="Contact" fullWidth margin="normal" />
                    <TextField label="Note" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePaymentModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Payment")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PaymentPage;