import { UbsDTO } from "./Ubs";
import { AnalisePaciente } from "./analise-paciente.enum";

export interface PacienteDTO {
    id: number;
    nome: string;
    ubs?: UbsDTO;
    dataNascimento: Date;
    dataCriacao: Date;
    horaCriacao: Date;
    cpf: string;
    analisePaciente: AnalisePaciente;
    cartaoSus: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
    numero: number;
    codigo: number;
    tipoArbovirose: TipoArbovirose;
    tipoAnalise: string;
    observacao: string;
    obito: string;
    obitoSuspeito: string;
    internado: string;
}

export enum TipoArbovirose {
    DENGUE = "DENGUE",
    CHIKUNGUNYA = "CHIKUNGUNYA",
    ZIKA = "ZIKA",
    FEBRE_AMARELA = "FEBRE_AMARELA",
    MALARIA = "MALARIA",
    FEBRE_AMARELA_URBANA = "FEBRE_AMARELA_URBANA",
    FEBRE_AMARELA_SILVESTRE = "FEBRE_AMARELA_SILVESTRE",
    LEISHMANIOSE = "LEISHMANIOSE",


}

export interface PacienteFilterParams {
    nome?: string;
    estado?: string;
    cidade?: string;
    tipoArbovirose: any;
    ascendente: boolean;
}

export interface PacienteUbsFilterParams {
    estado?: string;
    cidade?: string;
    nome?: string;
    tipoArbovirose: any;
    ascendente: boolean;
    ubsId?: number;
}

export interface PacienteCidadeFilterParams {
    cidade?: string;
    estado?: string;
}

export interface PacienteAdmEstadualFilterParams {
    nome: string;
    estado: string;
    cidade: string;
    tipoArbovirose: any;
    ascendente: boolean;
    ubsId: number;
}
