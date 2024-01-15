import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentoAdmEstadualFilterParams, DocumentoAdmMunicipalFilterParams, DocumentoAdmNacionalFilterParams, DocumentoDTO, DocumentoFilterParams } from '../models/Documento';
import { environment } from 'src/environments/environment';
import { createHttpParams } from '../shared/utils/http-utils';
import { DocumentPage } from '../models/document-page';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  public cache: DocumentoDTO[] = [];

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public listAll(): Observable<DocumentoDTO[]> {
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento`);
  }



  listAllPaged(mes: number, ano: number, cidade: string, page: number, size: number) {
    const url = `${this.apiUrl}/documento/${mes}/${ano}/${cidade}`;
    return this.http.get<DocumentPage>(url, { params: { page: page.toString(), size: size.toString() } }).pipe(
      first(),
      tap(data => (this.cache = data.documents))
    );
  }

  public listByFilter(filterParams: DocumentoFilterParams): Observable<DocumentoDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/filter`, { params: httpParams });
  }

  public listByAdmMunicipalFilter(filterParams: DocumentoAdmMunicipalFilterParams): Observable<DocumentoDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/filter-adm-municipal`, { params: httpParams });
  }

  public listByAdmEstadualFilter(filterParams: DocumentoAdmEstadualFilterParams): Observable<DocumentoDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/filter-adm-estadual`, { params: httpParams });
  }

  public listByAdmNacionalFilter(filterParams: DocumentoAdmNacionalFilterParams): Observable<DocumentoDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/filter-adm-estadual`, { params: httpParams });
  }

  public listByCidade(cidade: string): Observable<DocumentoDTO[]> {
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/cidade/${cidade}`);
  }

  public listByEstado(uf: string): Observable<DocumentoDTO[]> {
    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/documento/estado/${uf}`);
  }

  public getById(documentoId: number): Observable<DocumentoDTO> {
    return this.http.get<DocumentoDTO>(`${this.apiUrl}/documento/${documentoId}`);
  }

  public getByAgente(documentoId: number): Observable<DocumentoDTO> {
    return this.http.get<DocumentoDTO>(`${this.apiUrl}/documento/agente/${documentoId}`);
  }

  public create(documento: DocumentoDTO): Observable<DocumentoDTO> {
    return this.http.post<DocumentoDTO>(`${this.apiUrl}/documento`, documento);
  }

  public update(documento: DocumentoDTO): Observable<DocumentoDTO> {
    return this.http.put<DocumentoDTO>(`${this.apiUrl}/documento/${documento.id}`, documento);
  }

  public updateByAdm(documentoId: number, params: any): Observable<DocumentoDTO> {
    return this.http.put<DocumentoDTO>(`${this.apiUrl}/documento/painel/${documentoId}`, params);
  }

  public deleteById(documento: DocumentoDTO):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/documento/${documento}`);
  }

}
