import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ContactTypeTableProps {
    data: any[];
    onEdit: (contactType: any) => void;
    onDelete: (contactTypeId: string) => void;
}

const ContactTypeTable: React.FC<ContactTypeTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedContactType, setSelectedContactType] = useState<any>(null);

    const handleEditClick = (contactType: any) => {
        setSelectedContactType(contactType);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (selectedContactType) {
            onEdit({
                id: selectedContactType.id,
                name: selectedContactType.name, // Pass the updated name
            });
        }
        handleCloseEditModal();
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedContactType(null);
    };

    const handleDeleteClick = (contactType: any) => {
        setSelectedContactType(contactType);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedContactType) {
            onDelete(selectedContactType.id); // Call the onDelete function with the selected contact type ID
        }
        handleCloseDeleteModal();
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedContactType(null);
    };

    const contactTypeColumns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, headerAlign: "center" },
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
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={contactTypeColumns}
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
                <DialogTitle>Edit Contact Type</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={selectedContactType?.name || ""}
                        onChange={(e) =>
                            setSelectedContactType((prev: any) => ({
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
                        Are you sure you want to delete the contact type{" "}
                        <strong>{selectedContactType?.name}</strong>?
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

export default ContactTypeTable;