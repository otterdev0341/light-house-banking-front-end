import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ExpenseTable from "../data_table/expense_table";
import ExpenseTypeTable from "../data_table/expense_type_table";


const mockExpenseData = {
    data: [
        {
            id: "1",
            description: "Office Supplies",
            expense_type_name: "Operational",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            description: "Travel Expenses",
            expense_type_name: "Travel",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const mockExpenseTypeData = {
    data: [
        {
            id: "1",
            name: "Operational",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            name: "Travel",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const ExpensePage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isExpenseTypeModalOpen, setIsExpenseTypeModalOpen] = useState<boolean>(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleCreateExpense = () => {
        setIsExpenseModalOpen(true);
    };

    const handleCreateExpenseType = () => {
        setIsExpenseTypeModalOpen(true);
    };

    const handleCloseExpenseModal = () => {
        setIsExpenseModalOpen(false);
    };

    const handleCloseExpenseTypeModal = () => {
        setIsExpenseTypeModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Expenses" />
                    <Tab label="Expense Types" />
                </Tabs>
            </Box>

            {/* Expenses Section */}
            <Box hidden={tabIndex !== 0} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Expenses</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateExpense}>
                        Create New Expense
                    </Button>
                </div>
                <ExpenseTable
                    data={mockExpenseData.data}
                    onEdit={(expense) => console.log("Edit Expense:", expense)}
                    onDelete={(expenseId) => console.log("Delete Expense:", expenseId)}
                />
            </Box>

            {/* Expense Types Section */}
            <Box hidden={tabIndex !== 1} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Expense Types</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateExpenseType}>
                        Create New Expense Type
                    </Button>
                </div>
                <ExpenseTypeTable
                    data={mockExpenseTypeData.data}
                    onEdit={(expenseType) => console.log("Edit Expense Type:", expenseType)}
                    onDelete={(expenseTypeId) => console.log("Delete Expense Type:", expenseTypeId)}
                />
            </Box>

            {/* Modal for Creating Expense */}
            <Dialog open={isExpenseModalOpen} onClose={handleCloseExpenseModal}>
                <DialogTitle>Create New Expense</DialogTitle>
                <DialogContent>
                    <TextField label="Description" fullWidth margin="normal" />
                    <TextField label="Expense Type" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExpenseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Expense")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Expense Type */}
            <Dialog open={isExpenseTypeModalOpen} onClose={handleCloseExpenseTypeModal}>
                <DialogTitle>Create New Expense Type</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExpenseTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Expense Type")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExpensePage;