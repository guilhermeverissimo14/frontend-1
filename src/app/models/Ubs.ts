export interface UbsDTO {
    id: number;
    nome: string;
    cnpj: string;
    cnes: string;
    estado: string;
    municipio: string;
    bairro: string;
    cep: string;
    logradouro: string;
    numero: number;
    dataCriacao: Date;
    horaCriacao: Date;
}

export interface UbsCadastroDTO {
    value: number;
    label: string;
}

export interface UbsFilterParams {
    nome?: string;
    cnes?: string;
    cidade?: string;
    estado?: string
}
