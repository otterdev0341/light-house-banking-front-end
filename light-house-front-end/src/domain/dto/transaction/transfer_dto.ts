export interface ReqCreateTransferDto {
    transaction_type_id: string;
    amount: number;
    asset_id: string;
    destination_asset_id: string;
    contact_id: string;
    note: string;
    created_at: string;
  }
  
  export interface ReqUpdateTransferDto {
    amount?: number;
    asset_id?: string;
    destination_asset_id?: string;
    contact_id?: string;
    note?: string;
    created_at?: string;
  }
  
  export interface ResEntryTransferDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    asset_name: string;
    destination_asset_name: string;
    contact_name: string;
    note: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListTransferDto {
    length: number;
    data: ResEntryTransferDto[];
  }