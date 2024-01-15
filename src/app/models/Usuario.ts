import { Role } from "./Role";
import { UbsDTO } from "./Ubs";

export interface UsuarioDTO {
    id: number;
    nome: string;
    tipoUsuario: Role;
    email: string;
    cpf: string;
    cnes: string;
    estado: string;
    municipio: string;
    regiaoGeografica: string;
    dataCriacao: Date;
    horaCriacao: Date;
    ubs: UbsDTO;
    somaQuantidadeLarvicida: number;
    quantidadeDocumentosAFazer:number;
}

export interface UsuarioFilterParams {
    nome: string;
    cidade: string;
}

export interface UsuarioAdmGeralFilterParams {
    nome: string;
    estado: string;
    cidade: string;
}
