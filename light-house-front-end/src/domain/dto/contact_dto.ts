export interface ReqCreateContactDto {
    name: string;             // must not be empty
    business_name: string;
    phone: string;
    description: string;
    contact_type_id: string;  // must not be empty
  }
  
  export interface ReqUpdateContactDto {
    name?: string;
    business_name?: string;
    phone?: string;
    description?: string;
    contact_type_id?: string;
  }
  
  export interface ResEntryContactDto {
    id: string;
    name: string;
    business_name: string;
    phone: string;
    description: string;
    contact_type_name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListContactDto {
    length: number;
    data: ResEntryContactDto[];
  }
  