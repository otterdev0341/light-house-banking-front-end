import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Autocomplete } from "@mui/material";
import ExpenseTable from "../data_table/expense_table";
import ExpenseTypeTable from "../data_table/expense_type_table";
import useTokenStore from "../../store/token_store";
import { ExpenseTypeService } from "../../service/expense_type_service";
import useExpenseTypeStore from "../../store/expense_type_store";
import { ExpenseService } from "../../service/expense_service";
import useExpenseStore from "../../store/expense_store";
import type { ReqCreateExpenseTypeDto } from "../../domain/dto/expense_type_dto";
import type { ReqCreateExpenseDto, ReqUpdateExpenseDto } from "../../domain/dto/expense_dto";




const ExpensePage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isExpenseTypeModalOpen, setIsExpenseTypeModalOpen] = useState<boolean>(false);
    const [newExpenseType, setNewExpenseType] = useState<string>("");
    const [newExpense, setNewExpense] = useState<string>("");
    const [selectedExpenseTypeId, setSelectedExpenseTypeId] = useState<string | null>(null);
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

    const handle_create_expense = async () => {
        const req_create_expense_dto: ReqCreateExpenseDto = {
            description: newExpense ? newExpense : "",
            expense_type_id: selectedExpenseTypeId ? selectedExpenseTypeId : "",
        }
        const expense_service = ExpenseService.getInstance();
        const isExist = await expense_service.is_exist(req_create_expense_dto.description);
        if (isExist) {
            alert("Expense already exists. Please choose a different description.");
            return; // Exit if the expense already exists
        }
        try {
            const response = await expense_service.createExpense(req_create_expense_dto);
            // response check
            if (!response || !response.id) {
                throw new Error("Failed to create expense. Please try again.");
            }
            // Log the response or update the UI accordingly
            console.log("Expense Created:", response);
            // Optionally, you can refresh the expense list here
            setNewExpense(""); // Clear the input field after creation
            setIsExpenseModalOpen(false); // Close the modal
            // Refresh the expense list
            await expense_service.getExpenseList();
        }
        catch (error) {
            console.error("Error creating expense:", error);
        }
        setNewExpense(""); // Clear the input field after creation
        setIsExpenseModalOpen(false); // Close the modal
        await expense_service.getExpenseList(); // Refresh the expense list
        console.log("Expense Created:", req_create_expense_dto);
    }
    
    const handle_update_expense = async (expenseId: string, update_dto: ReqUpdateExpenseDto) => {
        const expense_service = ExpenseService.getInstance();
        try {
            const response = await expense_service.update_expense(expenseId, update_dto);
            // response check
            if (!response || !response.id) {
                throw new Error("Failed to update expense. Please try again.");
            }
            // Log the response or update the UI accordingly
            console.log("Expense Updated:", response);
            // Optionally, you can refresh the expense list here
            await expense_service.getExpenseList();
        }
        catch (error) {
            console.error("Error updating expense:", error);
        }
        setIsExpenseModalOpen(false); // Close the modal
        setNewExpense(""); // Clear the input field after update
        console.log("Expense Updated:", { id: expenseId, description: update_dto.description, expense_type_id: update_dto.expense_type_id });
    } // end update_expense

    const handle_delete_expense = async (expenseId: string) => {
        const expense_service = ExpenseService.getInstance();
        try {
            const response = await expense_service.delete_expense(expenseId);

            // Log the response or update the UI accordingly
            console.log("Expense Deleted:", response);
            // Optionally, you can refresh the expense list here
            await expense_service.getExpenseList();
        }
        catch (error) {
            console.error("Error deleting expense:", error);
        }
        console.log("Expense Deleted:", expenseId);
        setIsExpenseModalOpen(false); // Close the modal
        setNewExpense(""); // Clear the input field after deletion
        await expense_service.getExpenseList(); // Refresh the expense list
    }

    const handle_create_expense_type = async () => {
        const req_create_expense_type_dto: ReqCreateExpenseTypeDto = {
            name: expense_type ? newExpenseType : "",
        };
        const expense_type_service = ExpenseTypeService.getInstance();
        const isExist = await expense_type_service.is_exist(req_create_expense_type_dto.name);
        const expense_service = ExpenseService.getInstance();
        if (isExist) {
            alert("Expense type already exists. Please choose a different name.");
            return; // Exit if the expense type already exists
        }

        try {
            const response = await expense_type_service.createExpenseType(req_create_expense_type_dto);
            // response check
            if (!response || !response.id) {
                throw new Error("Failed to create expense type. Please try again.");
            }
            // Log the response or update the UI accordingly
            console.log("Expense Type Created:", response);
            // Optionally, you can refresh the expense type list here
            setNewExpenseType(""); // Clear the input field after creation
            setIsExpenseTypeModalOpen(false); // Close the modal
            // Refresh the expense type list
            await expense_type_service.getExpenseTypeList();
            await expense_service.getExpenseList(); // Refresh the expense list
        }
        catch (error) {
            console.error("Error creating expense type:", error);
        }
    }

    const handle_update_expense_type = async (expenseTypeId: string, updatedName: string) => {
        const expense_type_service = ExpenseTypeService.getInstance();
        try {
            const response = await expense_type_service.updateExpenseType(expenseTypeId, { name: updatedName });
            // response check
            if (!response || !response.id) {
                throw new Error("Failed to update expense type. Please try again.");
            }
            // Log the response or update the UI accordingly
            console.log("Expense Type Updated:", response);
            // Optionally, you can refresh the expense type list here
            await expense_type_service.getExpenseTypeList();
        }
        catch (error) {
            console.error("Error updating expense type:", error);
        }
        setIsExpenseTypeModalOpen(false); // Close the modal
        setNewExpenseType(""); // Clear the input field after update
        console.log("Expense Type Updated:", { id: expenseTypeId, name: updatedName });
    } // end update_expense_type

    const handle_delete_expense_type = async (expenseTypeId: string) => {
        const expense_type_service = ExpenseTypeService.getInstance();
        try {
            const response = await expense_type_service.deleteExpenseType(expenseTypeId);
            
            
            // Log the response or update the UI accordingly
            console.log("Expense Type Deleted:", response);
            // Optionally, you can refresh the expense type list here
            await expense_type_service.getExpenseTypeList();
        }
        catch (error) {
            console.error("Error deleting expense type:", error);
        }
        console.log("Expense Type Deleted:", expenseTypeId);
        setIsExpenseTypeModalOpen(false); // Close the modal
        setNewExpenseType(""); // Clear the input field after deletion
        await expense_type_service.getExpenseTypeList(); // Refresh the expense type list
    }

    

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
                    onEdit={(updatedExpense) =>
                        handle_update_expense(updatedExpense.id, {
                            description: updatedExpense.description,
                            expense_type_id: updatedExpense.expense_type_id,
                        })
                    }
                    onDelete={handle_delete_expense}
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
                    onEdit={(expenseType) => handle_update_expense_type(expenseType.id, expenseType.name)}
                    onDelete={handle_delete_expense_type}
                />
            </Box>

            {/* Modal for Creating Expense */}
            <Dialog open={isExpenseModalOpen} onClose={handleCloseExpenseModal}>
                <DialogTitle>Create New Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={newExpense}
                        onChange={(e) => setNewExpense(e.target.value)}
                    />
                    <Autocomplete
                        options={expense_type?.data || []} // Use expense types from the store
                        getOptionLabel={(option) => option.name} // Display the name of the expense type
                        onChange={(event, value) => setSelectedExpenseTypeId(value?.id || null)} // Set the selected expense type ID
                        renderInput={(params) => (
                            <TextField {...params} label="Expense Type" fullWidth margin="normal" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExpenseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handle_create_expense} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Expense Type */}
            <Dialog open={isExpenseTypeModalOpen} onClose={handleCloseExpenseTypeModal}>
                <DialogTitle>Create New Expense Type</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" value={newExpenseType} onInput={(e) => setNewExpenseType((e.target as HTMLInputElement).value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExpenseTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_expense_type()} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExpensePage;