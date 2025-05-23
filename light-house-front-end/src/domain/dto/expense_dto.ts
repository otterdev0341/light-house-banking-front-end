export interface ReqCreateExpenseDto {
    description: string; // must not be empty
    expense_type_id: string;
  }
  
  export interface ReqUpdateExpenseDto {
    description?: string;
    expense_type_id?: string;
  }
  
  export interface ResEntryExpenseDto {
    id: string;
    description: string;
    expense_type_name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListExpenseDto {
    length: number;
    data: ResEntryExpenseDto[];
  }
  