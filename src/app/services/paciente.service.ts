import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteAdmEstadualFilterParams, PacienteCidadeFilterParams, PacienteDTO, PacienteFilterParams, PacienteUbsFilterParams } from '../models/Paciente';
import { environment } from 'src/environments/environment';
import { createHttpParams } from '../shared/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public listAll(): Observable<PacienteDTO[]> {
    return this.http.get<PacienteDTO[]>(`${this.apiUrl}/paciente`);
  }

  public listByFilter(filterParams: PacienteFilterParams): Observable<PacienteDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<PacienteDTO[]>(`${this.apiUrl}/paciente/filter`, { params: httpParams });
  }

  public listByUbsFilter(filterParams: PacienteUbsFilterParams): Observable<PacienteDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<PacienteDTO[]>(`${this.apiUrl}/paciente/filter/ubs`, { params: httpParams });
  }

  public listByAdmEstadualFilter(filterParams: PacienteAdmEstadualFilterParams): Observable<PacienteDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<PacienteDTO[]>(`${this.apiUrl}/paciente/filter-adm-estadual`, { params: httpParams });
  }

  public listByCidade(filterParams: PacienteCidadeFilterParams): Observable<PacienteDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<PacienteDTO[]>(`${this.apiUrl}/paciente/filter/cidade`, { params: httpParams });
  }

  public getById(pacienteId: number): Observable<PacienteDTO> {
    return this.http.get<PacienteDTO>(`${this.apiUrl}/paciente/${pacienteId}`);
  }

  public create(paciente: PacienteDTO): Observable<PacienteDTO> {
    return this.http.post<PacienteDTO>(`${this.apiUrl}/paciente`, paciente);
  }

  public update(paciente: PacienteDTO): Observable<PacienteDTO> {
    return this.http.put<PacienteDTO>(`${this.apiUrl}/paciente/${paciente.id}`, paciente);
  }

  public deleteById(paciente: PacienteDTO): Observable<PacienteDTO> {
    return this.http.delete<PacienteDTO>(`${this.apiUrl}/paciente/${paciente}`);
  }

}
