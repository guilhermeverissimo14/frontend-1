import { UsuarioDTO } from "./Usuario";

export interface DocumentoDTO {
    id: number;
    tipoImovel: any;
    usuarioId: number;
    agente: string;
    acessoImovel: boolean;
    foto: string;
    observacao: string;
    logradouro: string;
    bairro: string;
    numero: number;
    cidade: string;
    uf: string;
    cep: string;
    quadra: string;
    zona: string;
    quantidadeLarvicida: number;
    tratamentoLarvicida: boolean;
    nomeProprietario: string;
    dataNascimentoProprietario: Date;
    cpfProprietario: string;
    presencaCriadouros: boolean;
    tipoDeposito: any;
    fotoCriadouro: string;
    coleta: boolean;
    quantidade: number;
    presencaLarva: boolean;
    observacaoCriadouro: string;
    dataCriacao: Date;
    horaCriacao: Date;
    tagCode: string;
    tipoIntervencao: string[];
    tipoAnalise: string[];
    tipoArbovirose: string[];
}

export interface DocumentoFilterParams {
    nomeProprietario?: string;
}

export interface DocumentoAdmMunicipalFilterParams {
    nomeProprietario: string;
    estado: string,
    cidade: string;
}

export interface DocumentoAdmEstadualFilterParams {
    nomeProprietario: string;
    estado: string;
    cidade: string;
}

export interface DocumentoAdmNacionalFilterParams {
    nomeProprietario: string;
    estado: string;
    cidade: string;
}
