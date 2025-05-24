import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ContactTableProps {
    data: any[];
    onEdit: (contact: any) => void;
    onDelete: (contactId: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<any>(null);

    const handleEditClick = (contact: any) => {
        setSelectedContact(contact);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (contact: any) => {
        setSelectedContact(contact);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedContact(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedContact(null);
    };

    const handleConfirmDelete = () => {
        if (selectedContact) {
            onDelete(selectedContact.id);
        }
        handleCloseDeleteModal();
    };

    const contactColumns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, headerAlign: "center" },
        { field: "business_name", headerName: "Business Name", flex: 1, headerAlign: "center" },
        { field: "phone", headerName: "Phone", flex: 1, headerAlign: "center" },
        { field: "description", headerName: "Description", flex: 2, headerAlign: "center" },
        { field: "contact_type_name", headerName: "Contact Type", flex: 1, headerAlign: "center" },
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
                    columns={contactColumns}
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
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedContact?.name}
                    />
                    <TextField
                        label="Business Name"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedContact?.business_name}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedContact?.phone}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedContact?.description}
                    />
                    <TextField
                        label="Contact Type"
                        fullWidth
                        margin="normal"
                        defaultValue={selectedContact?.contact_type_name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onEdit(selectedContact);
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
                    Are you sure you want to delete <strong>{selectedContact?.name}</strong>?
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

export default ContactTable;