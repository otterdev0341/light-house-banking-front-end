import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

interface ExpenseTypeTableProps {
    data: any[];
    onEdit: (expenseType: any) => void;
    onDelete: (expenseTypeId: string) => void;
}

const ExpenseTypeTable: React.FC<ExpenseTypeTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedExpenseType, setSelectedExpenseType] = useState<any>(null);

    // Handle Edit Click
    const handleEditClick = (expenseType: any) => {
        setSelectedExpenseType(expenseType);
        setIsEditModalOpen(true);
    };

    // Handle Save Edit
    const handleSaveEdit = () => {
        if (selectedExpenseType) {
            onEdit({
                id: selectedExpenseType.id,
                name: selectedExpenseType.name, // Pass the updated name
            });
        }
        handleCloseEditModal();
    };

    // Handle Close Edit Modal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedExpenseType(null);
    };

    // Handle Delete Click
    const handleDeleteClick = (expenseType: any) => {
        setSelectedExpenseType(expenseType);
        setIsDeleteModalOpen(true);
    };

    // Handle Confirm Delete
    const handleConfirmDelete = () => {
        if (selectedExpenseType) {
            onDelete(selectedExpenseType.id); // Call the onDelete function with the selected expense type ID
        }
        handleCloseDeleteModal();
    };

    // Handle Close Delete Modal
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedExpenseType(null);
    };

    const expenseTypeColumns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, headerAlign: "center" },
        { field: "created_at", headerName: "Created At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") },
        { field: "updated_at", headerName: "Updated At", flex: 1, headerAlign: "center", valueGetter: (params) => dayjs(params).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") },
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
                    columns={expenseTypeColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Expense Type</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={selectedExpenseType?.name || ""}
                        onChange={(e) =>
                            setSelectedExpenseType((prev: any) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>
                        Are you sure you want to delete the expense type{" "}
                        <strong>{selectedExpenseType?.name}</strong>?
                    </p>
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

export default ExpenseTypeTable;