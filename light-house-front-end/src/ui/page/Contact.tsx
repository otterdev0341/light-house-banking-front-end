import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ContactTable from "../data_table/Contact_table";
import ContactTypeTable from "../data_table/Contact_type_table";
import useTokenStore from "../../store/token_store";
import useContactStore from "../../store/contact_store";
import useContactTypeStore from "../../store/contact_type_store";
import { ContactService } from "../../service/contact_service";
import { ContactTypeService } from "../../service/contact_type_service";
import type { ReqUpdateContactDto } from "../../domain/dto/contact_dto";
import type { ReqUpdateContactTypeDto } from "../../domain/dto/contact_type_dto";
import Autocomplete from "@mui/material/Autocomplete";
import type { ReqCreateContactDto } from "../../domain/dto/contact_dto";

const ContactPage: React.FC = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
    const [isContactTypeModalOpen, setIsContactTypeModalOpen] = useState<boolean>(false);
    const [newContactTypeName, setNewContactTypeName] = useState<string>("");
    const [newContact, setNewContact] = useState<ReqCreateContactDto>({
        name: "",
        business_name: "",
        phone: "",
        description: "",
        contact_type_id: "",
    });
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

    const handle_update_contact = async (contactId: string, update_dto: ReqUpdateContactDto) => {
        const contact_service = ContactService.getInstance();
        try {
            const response = await contact_service.update_contact(contactId, update_dto);
            if (!response || !response.id) {
                throw new Error("Failed to update contact. Please try again.");
            }
            console.log("Contact Updated:", response);
            await contact_service.getContacts(); // Refresh the contact list
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };
    
    const handle_delete_contact = async (contactId: string) => {
        const contact_service = ContactService.getInstance();
        try {
            const response = await contact_service.delete_contact(contactId);
            console.log("Contact Deleted:", response);
            await contact_service.getContacts(); // Refresh the contact list
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handle_update_contact_type = async (contactTypeId: string, update_dto: ReqUpdateContactTypeDto) => {
        const contact_type_service = ContactTypeService.getInstance();
        try {
            const response = await contact_type_service.updateContactType(contactTypeId, update_dto);
            if (!response || !response.id) {
                throw new Error("Failed to update contact type. Please try again.");
            }
            console.log("Contact Type Updated:", response);
            await contact_type_service.getContactTypeList(); // Refresh the contact type list
        } catch (error) {
            console.error("Error updating contact type:", error);
        }
    };

    const handle_delete_contact_type = async (contactTypeId: string) => {
        const contact_type_service = ContactTypeService.getInstance();
        try {
            await contact_type_service.deleteContactType(contactTypeId);
            console.log("Contact Type Deleted:", contactTypeId);
            await contact_type_service.getContactTypeList(); // Refresh the contact type list
        } catch (error) {
            console.error("Error deleting contact type:", error);
        }
    };

    const handle_create_contact_type = async (name: string) => {
        const contact_type_service = ContactTypeService.getInstance();

        if (!name.trim()) {
            alert("Contact type name cannot be empty.");
            return;
        }

        try {
            const response = await contact_type_service.create_contact_type({ name });
            console.log("Contact Type Created:", response);

            // Refresh the contact type list
            await contact_type_service.getContactTypeList();

            // Close the modal
            setIsContactTypeModalOpen(false);
        } catch (error) {
            console.error("Error creating contact type:", error);
            alert("An error occurred while creating the contact type. Please try again.");
        }
    };

    const handle_create_contact = async (contactDto: ReqCreateContactDto) => {
        const contact_service = ContactService.getInstance();

        if (!contactDto.name.trim() || !contactDto.contact_type_id) {
            alert("Name and Contact Type are required.");
            return;
        }

        try {
            const response = await contact_service.createContact(contactDto);
            console.log("Contact Created:", response);

            // Refresh the contact list
            await contact_service.getContacts();

            // Clear the input fields (but keep the modal open)
            setNewContact({
                name: "",
                business_name: "",
                phone: "",
                description: "",
                contact_type_id: "",
            });
            setIsContactModalOpen(false); // Close the modal after creation
        } catch (error) {
            console.error("Error creating contact:", error);
            alert("An error occurred while creating the contact. Please try again.");
        }
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
                    onEdit={(updatedContact) =>
                        handle_update_contact(updatedContact.id, {
                            name: updatedContact.name,
                            business_name: updatedContact.business_name,
                            phone: updatedContact.phone,
                            description: updatedContact.description,
                            contact_type_id: updatedContact.contact_type_id,
                        })
                    }
                    onDelete={handle_delete_contact}
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
                    onEdit={(updatedContactType) =>
                        handle_update_contact_type(updatedContactType.id, {
                            name: updatedContactType.name,
                        })
                    }
                    onDelete={handle_delete_contact_type}
                />
            </Box>

            {/* Modal for Creating Contact */}
            <Dialog open={isContactModalOpen} onClose={handleCloseContactModal}>
                <DialogTitle>Create New Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newContact.name}
                        onChange={(e) =>
                            setNewContact((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Business Name"
                        fullWidth
                        margin="normal"
                        value={newContact.business_name}
                        onChange={(e) =>
                            setNewContact((prev) => ({
                                ...prev,
                                business_name: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        value={newContact.phone}
                        onChange={(e) =>
                            setNewContact((prev) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={newContact.description}
                        onChange={(e) =>
                            setNewContact((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                    <Autocomplete
                        options={contact_type?.data || []} // Use contact types from the store
                        getOptionLabel={(option) => option.name} // Display the name of the contact type
                        value={
                            contact_type?.data.find(
                                (type) => type.id === newContact.contact_type_id
                            ) || null
                        } // Set the current value
                        onChange={(event, value) =>
                            setNewContact((prev) => ({
                                ...prev,
                                contact_type_id: value?.id || "",
                            }))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Contact Type" fullWidth margin="normal" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContactModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_contact(newContact)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Creating Contact Type */}
            <Dialog open={isContactTypeModalOpen} onClose={handleCloseContactTypeModal}>
                <DialogTitle>Create New Contact Type</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newContactTypeName}
                        onChange={(e) => setNewContactTypeName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContactTypeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => handle_create_contact_type(newContactTypeName)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ContactPage;

