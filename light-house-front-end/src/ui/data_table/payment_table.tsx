import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface PaymentTableProps {
    data: any[];
    onEdit: (payment: any) => void;
    onDelete: (paymentId: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    const handleEditClick = (payment: any) => {
        setSelectedPayment(payment);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (payment: any) => {
        setSelectedPayment(payment);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedPayment(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedPayment(null);
    };

    const handleConfirmDelete = () => {
        if (selectedPayment) {
            onDelete(selectedPayment.id);
        }
        handleCloseDeleteModal();
    };

    const paymentColumns: GridColDef[] = [
        { field: "transaction_type_name", headerName: "Transaction Type", flex: 1, headerAlign: "center" },
        { field: "amount", headerName: "Amount", flex: 1, headerAlign: "center" },
        { field: "expense_name", headerName: "Expense", flex: 1, headerAlign: "center" },
        { field: "asset_name", headerName: "Asset", flex: 1, headerAlign: "center" },
        { field: "contact_name", headerName: "Contact", flex: 1, headerAlign: "center" },
        { field: "note", headerName: "Note", flex: 2, headerAlign: "center" },
        { field: "created_at", headerName: "Created At", flex: 1, headerAlign: "center" },
        { field: "updated_at", headerName: "Updated At", flex: 1, headerAlign: "center" },
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
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={paymentColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Payment</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Transaction Type"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.transaction_type_name}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.amount}
                    />
                    <TextField
                        label="Expense"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.expense_name}
                    />
                    <TextField
                        label="Asset"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.asset_name}
                    />
                    <TextField
                        label="Contact"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.contact_name}
                    />
                    <TextField
                        label="Note"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedPayment?.note}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onEdit(selectedPayment);
                            handleCloseEditModal();
                        }}
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
                    Are you sure you want to delete <strong>{selectedPayment?.transaction_type_name}</strong>?
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

export default PaymentTable;