export interface ReqCreateIncomeDto {
    transaction_type_id: string;
    amount: number;
    asset_id: string;
    contact_id: string;
    note: string;
    created_at: string;
  }
  
  export interface ReqUpdateIncomeDto {
    amount?: number;
    asset_id?: string;
    contact_id?: string;
    note?: string;
    created_at?: string;
  }
  
  export interface ResEntryIncomeDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    asset_name: string;
    contact_name: string;
    note: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListIncomeDto {
    length: number;
    data: ResEntryIncomeDto[];
  }