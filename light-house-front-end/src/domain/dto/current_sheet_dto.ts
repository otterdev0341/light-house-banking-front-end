export interface ResCurrentSheetDto {
    id: string;
    asset_name: string;
    balance: number;
    last_transaction_id?: string; // optional
    updated_at: string;
  }
  
  export interface ResListCurrentSheetDto {
    length: number;
    data: ResCurrentSheetDto[];
  }
  