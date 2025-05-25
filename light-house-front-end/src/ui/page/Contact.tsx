import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ContactTable from "../data_table/Contact_table";
import ContactTypeTable from "../data_table/Contact_type_table";
import useTokenStore from "../../store/token_store";
import useContactStore from "../../store/contact_store";
import useContactTypeStore from "../../store/contact_type_store";
import { ContactService } from "../../service/contact_service";
import { ContactTypeService } from "../../service/contact_type_service";



const ContactPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
    const [isContactTypeModalOpen, setIsContactTypeModalOpen] = useState<boolean>(false);
    const token = useTokenStore((state) => state.token);
    const contact = useContactStore((state) => state.contacts);
    const contact_type = useContactTypeStore((state) => state.contactTypes);
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

    // contact
    useEffect(() => {
        const fetchContact = async () => {
            if (token) {
                try {
                    
                    const contact_service = ContactService.getInstance();
                    await contact_service.getContacts();
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            }
        };

        fetchContact();
    },[token]);

    if (!contact || !contact.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Contact</h1>
                <p className="text-lg">No contact data available.</p>
            </div>
        );
    }

    // contact type
    useEffect(() => {
        const fetchContactType = async () => {
            if (token) {
                try {
                    const contact_type_service = ContactTypeService.getInstance();
                    await contact_type_service.getContactTypeList();
                } catch (error) {
                    console.error("Error fetching contact types:", error);
                }
            }
        };

        fetchContactType();
    },[token])
    if (!contact_type || !contact_type.data) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Contact Type</h1>
                <p className="text-lg">No contact type data available.</p>
            </div>
        );
    }


    // return component
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
                    data={contact.data}
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
                    data={contact_type.data}
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