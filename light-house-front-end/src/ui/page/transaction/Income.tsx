import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import IncomeTable from "../../data_table/income_table";


const mockIncomeData = {
    data: [
        {
            id: "1",
            transaction_type_name: "Salary",
            amount: 5000,
            asset_name: "Bank Account",
            contact_name: "Employer",
            note: "Monthly salary",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            transaction_type_name: "Freelance",
            amount: 2000,
            asset_name: "PayPal",
            contact_name: "Client",
            note: "Freelance project payment",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const IncomePage: React.FC = () => {
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);

    const handleCreateIncome = () => {
        setIsIncomeModalOpen(true);
    };

    const handleCloseIncomeModal = () => {
        setIsIncomeModalOpen(false);
    };

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
                    data={mockIncomeData.data}
                    onEdit={(income) => console.log("Edit Income:", income)}
                    onDelete={(incomeId) => console.log("Delete Income:", incomeId)}
                />
            </Box>

            {/* Modal for Creating Income */}
            <Dialog open={isIncomeModalOpen} onClose={handleCloseIncomeModal}>
                <DialogTitle>Create New Income</DialogTitle>
                <DialogContent>
                    <TextField label="Transaction Type" fullWidth margin="normal" />
                    <TextField label="Amount" type="number" fullWidth margin="normal" />
                    <TextField label="Asset" fullWidth margin="normal" />
                    <TextField label="Contact" fullWidth margin="normal" />
                    <TextField label="Note" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIncomeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Income")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default IncomePage;