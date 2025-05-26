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