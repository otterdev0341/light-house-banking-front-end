import React, { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import useContactTypeStore from "../../store/contact_type_store"; // Import the contact_type_store

interface ContactTableProps {
    data: any[];
    onEdit: (contact: any) => void;
    onDelete: (contactId: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<any>(null);

    // Fetch contact types from the store
    const contactTypes = useContactTypeStore((state) => state.contactTypes?.data || []);

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

    const handleSaveEdit = () => {
        if (selectedContact) {
            onEdit({
                id: selectedContact.id,
                name: selectedContact.name,
                business_name: selectedContact.business_name,
                phone: selectedContact.phone,
                description: selectedContact.description,
                contact_type_id: selectedContact.contact_type_id,
            });
        }
        handleCloseEditModal();
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
                        value={selectedContact?.name || ""}
                        onChange={(e) =>
                            setSelectedContact((prev: any) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Business Name"
                        fullWidth
                        margin="normal"
                        value={selectedContact?.business_name || ""}
                        onChange={(e) =>
                            setSelectedContact((prev: any) => ({
                                ...prev,
                                business_name: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        value={selectedContact?.phone || ""}
                        onChange={(e) =>
                            setSelectedContact((prev: any) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={selectedContact?.description || ""}
                        onChange={(e) =>
                            setSelectedContact((prev: any) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                    <Autocomplete
                        options={contactTypes} // Use contact types from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact type
                        value={contactTypes.find(
                            (type) => type.id === selectedContact?.contact_type_id
                        ) || null} // Set the current value
                        onChange={(event, value) =>
                            setSelectedContact((prev: any) => ({
                                ...prev,
                                contact_type_name: value?.name || "",
                                contact_type_id: value?.id || null, // Store the ID for updates
                            }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Contact Type" fullWidth margin="normal" />
                        )}
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