export interface ReqTransactionTypeDto {
    name: string;
  }
  
  export interface ReqUpdateTransactionTypeDto {
    name?: string;
  }
  
  export interface ResEntryTransactionTypeDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListTransactionTypeDto {
    length: number;
    data: ResEntryTransactionTypeDto[];
  }
  