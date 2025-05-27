import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import useExpenseTypeStore from "../../store/expense_type_store"; // Import the expense_type_store
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


dayjs.extend(utc);
dayjs.extend(timezone);

interface ExpenseTableProps {
    data: any[];
    onEdit: (expense: any) => void;
    onDelete: (expenseId: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<any>(null);

    // Fetch expense types from the store
    const expenseTypes = useExpenseTypeStore((state) => state.expenseTypes?.data || []);

    const handleEditClick = (expense: any) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (expense: any) => {
        setSelectedExpense(expense);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedExpense(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedExpense(null);
    };

    const handleConfirmDelete = () => {
        if (selectedExpense) {
            onDelete(selectedExpense.id);
        }
        handleCloseDeleteModal();
    };

    const handleSaveEdit = () => {
        if (selectedExpense) {
            onEdit({
                id: selectedExpense.id,
                description: selectedExpense.description,
                expense_type_id: selectedExpense.expense_type_id,
            });
        }
        handleCloseEditModal();
    };

    const expenseColumns: GridColDef[] = [
        { field: "description", headerName: "Description", flex: 2, headerAlign: "center" },
        { field: "expense_type_name", headerName: "Expense Type", flex: 1, headerAlign: "center" },
        { field: "created_at", headerName: "Created At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") },
        { field: "updated_at", headerName: "Updated At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")  },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            headerAlign: "center",
            renderCell: (params) => (
                <div
                    className="flex items-center gap-2"
                    style={{ justifyContent: "center", width: "100%" }}
                >
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEditClick(params.row)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <ModeEditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDeleteClick(params.row)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={expenseColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={selectedExpense?.description || ""}
                        onChange={(e) =>
                            setSelectedExpense((prev: any) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                    <Autocomplete
                        options={expenseTypes} // Use expense types from the store
                        getOptionLabel={(option) => option.name} // Display the name of the expense type
                        value={expenseTypes.find(
                            (type) => type.id === selectedExpense?.expense_type_id
                        ) || null} // Set the current value
                        onChange={(event, value) =>
                            setSelectedExpense((prev: any) => ({
                                ...prev,
                                expense_type_name: value?.name || "",
                                expense_type_id: value?.id || null, // Store the ID for updates
                            }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Expense Type" fullWidth margin="normal" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEdit}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete <strong>{selectedExpense?.description}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ExpenseTable;