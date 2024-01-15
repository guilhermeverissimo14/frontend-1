import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAdmGeralFilterParams, UsuarioDTO, UsuarioFilterParams } from '../models/Usuario';
import { environment } from 'src/environments/environment';
import { createHttpParams } from '../shared/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public listAll(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario`);
  }

  getByConsumo(mes:number, ano:number, cidade: string): Observable<UsuarioDTO[]>{
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/consumo/${mes}/${ano}/${cidade}`)
  }

  public listAllUbsByCidade(filterParams: any): Observable<UsuarioDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/ubs`, { params: httpParams });
  }

  public listAllUbsByEstado(filterParams: any): Observable<UsuarioDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/ubs-adm-estadual`, { params: httpParams });
  }

  public listByFilter(filterParams: UsuarioFilterParams): Observable<UsuarioDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/filter`, { params: httpParams });
  }

  public listByAdmGeralFilter(filterParams: UsuarioAdmGeralFilterParams): Observable<UsuarioDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UsuarioDTO[]>(`${this.apiUrl}/usuario/filter-adm-geral`, { params: httpParams });
  }

  public getById(usuarioId: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  public create(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/usuario`, usuario);
  }

  public update(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(`${this.apiUrl}/usuario/${usuario.id}`, usuario);
  }

  public deleteById(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.delete<UsuarioDTO>(`${this.apiUrl}/usuario/${usuario}`);
  }

}
