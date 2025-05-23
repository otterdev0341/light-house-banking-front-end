export interface ResGenderDto {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ResListGenderDto {
    length: number;
    data: ResGenderDto[];
  }
  