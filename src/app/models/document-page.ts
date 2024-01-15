import { DocumentoDTO } from "./Documento";

export interface DocumentPage {
  documents: DocumentoDTO[];
  totalPages?: number;
  totalElements: number;

}
