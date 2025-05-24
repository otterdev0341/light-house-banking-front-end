import type { ResListContactDto } from "../domain/dto/contact_dto";

// Mock data for ResListContactDto
export const mockContactData: ResListContactDto = {
    length: 3,
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
        {
            id: "3",
            name: "Alice Johnson",
            business_name: "Johnson Consulting",
            phone: "555-123-4567",
            description: "Consultant for business strategies",
            contact_type_name: "Consultant",
            created_at: "2023-03-01T09:00:00Z",
            updated_at: "2023-03-15T11:00:00Z",
        },
    ],
};