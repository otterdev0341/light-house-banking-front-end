import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ExpenseTable from "../data_table/expense_table";
import ExpenseTypeTable from "../data_table/expense_type_table";
import useTokenStore from "../../store/token_store";
import { ExpenseTypeService } from "../../service/expense_type_service";
import useExpenseTypeStore from "../../store/expense_type_store";
import { ExpenseService } from "../../service/expense_service";
import useExpenseStore from "../../store/expense_store";





const ExpensePage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isExpenseTypeModalOpen, setIsExpenseTypeModalOpen] = useState<boolean>(false);
    const token = useTokenStore((state) => state.token);
    const expense_type = useExpenseTypeStore((state) => state.expenseTypes);
    const expense = useExpenseStore((state) => state.expenses);
    
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

    // expense 
    useEffect(() => {
        const fetchExpense = async () => {
            if (token) {
                try {
                    const expense_service = ExpenseService.getInstance();
                    await expense_service.getExpenseList();
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                }
            }
        }

        fetchExpense();
    },[token])

    if (!expense || !expense.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Expense</h1>
                <p className="text-lg">No expense data available.</p>
            </div>
        );
    }

    // expense type
    useEffect(() => {
        const fetchExpenseType = async () => {
            if (token) {
                try{
                    const expense_type_service = ExpenseTypeService.getInstance();
                    await expense_type_service.getExpenseTypeList();
                } catch (error) {
                    console.error("Error fetching expense types:", error);
                }
            }
        }

        fetchExpenseType();
    }, [token]);

    if (!expense_type || !expense_type.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Expense Type</h1>
                <p className="text-lg">No expense type data available.</p>
            </div>
        );
    }


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
                    data={expense.data}
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
                    data={expense_type.data}
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