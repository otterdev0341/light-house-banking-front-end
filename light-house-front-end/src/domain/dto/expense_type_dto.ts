export interface ReqCreateExpenseTypeDto {
    name: string; // must not be empty
  }
  
  export interface ReqUpdateExpenseTypeDto {
    name?: string;
  }
  
  export interface ResEntryExpenseTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListExpenseTypeDto {
    length: number;
    data: ResEntryExpenseTypeDto[];
  }
  