import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ContactTable from "../data_table/Contact_table";
import ContactTypeTable from "../data_table/Contact_type_table";


const mockContactData = {
    data: [
        {
            id: "1",
            name: "John Doe",
            business_name: "Doe Enterprises",
            phone: "123-456-7890",
            description: "A regular customer",
            contact_type_name: "Customer",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            name: "Jane Smith",
            business_name: "Smith & Co.",
            phone: "987-654-3210",
            description: "Supplier of office equipment",
            contact_type_name: "Supplier",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const mockContactTypeData = {
    data: [
        {
            id: "1",
            name: "Customer",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-10T15:00:00Z",
        },
        {
            id: "2",
            name: "Supplier",
            created_at: "2023-02-01T12:00:00Z",
            updated_at: "2023-02-05T14:00:00Z",
        },
    ],
};

const ContactPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
    const [isContactTypeModalOpen, setIsContactTypeModalOpen] = useState<boolean>(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleCreateContact = () => {
        setIsContactModalOpen(true);
    };

    const handleCreateContactType = () => {
        setIsContactTypeModalOpen(true);
    };

    const handleCloseContactModal = () => {
        setIsContactModalOpen(false);
    };

    const handleCloseContactTypeModal = () => {
        setIsContactTypeModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Contacts" />
                    <Tab label="Contact Types" />
                </Tabs>
            </Box>

            {/* Contacts Section */}
            <Box hidden={tabIndex !== 0} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Contacts</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateContact}>
                        Create New Contact
                    </Button>
                </div>
                <ContactTable
                    data={mockContactData.data}
                    onEdit={(contact) => console.log("Edit Contact:", contact)}
                    onDelete={(contactId) => console.log("Delete Contact:", contactId)}
                />
            </Box>

            {/* Contact Types Section */}
            <Box hidden={tabIndex !== 1} sx={{ mt: 2 }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Contact Types</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateContactType}>
                        Create New Contact Type
                    </Button>
                </div>
                <ContactTypeTable
                    data={mockContactTypeData.data}
                    onEdit={(contactType) => console.log("Edit Contact Type:", contactType)}
                    onDelete={(contactTypeId) => console.log("Delete Contact Type:", contactTypeId)}
                />
            </Box>

            {/* Modal for Creating Contact */}
            <Dialog open={isContactModalOpen} onClose={handleCloseContactModal}>
                <DialogTitle>Create New Contact</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" />
                    <TextField label="Business Name" fullWidth margin="normal" />
                    <TextField label="Phone" fullWidth margin="normal" />
                    <TextField label="Description" fullWidth margin="normal" />
                    <TextField label="Contact Type" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContactModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Contact")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Contact Type */}
            <Dialog open={isContactTypeModalOpen} onClose={handleCloseContactTypeModal}>
                <DialogTitle>Create New Contact Type</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContactTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => console.log("Create Contact Type")} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ContactPage;