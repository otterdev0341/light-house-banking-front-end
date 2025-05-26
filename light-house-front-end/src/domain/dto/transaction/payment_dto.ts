
export interface ReqCreatePaymentDto {
    transaction_type_id: string;
    amount: number;
    expense_id: string;
    asset_id: string;
    contact_id: string;
    note: string;
    created_at: string;
}

export interface ReqUpdatePaymentDto {
    amount?: number;
    expense_id?: string;
    asset_id?: string;
    contact_id?: string;
    note?: string;
    created_at?: string;
}

export interface ResEntryPaymentDto {
    id: string;
    transaction_type_name: string;
    amount: number;
    expense_name: string;
    contact_name: string;
    asset_name: string;
    note: string;
    created_at: string;
    updated_at: string;
}

export interface ResListPaymentDto {
    length: number;
    data: ResEntryPaymentDto[];
}