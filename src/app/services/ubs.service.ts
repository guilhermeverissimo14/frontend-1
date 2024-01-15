import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UbsDTO, UbsFilterParams } from '../models/Ubs';
import { environment } from 'src/environments/environment';
import { createHttpParams } from '../shared/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class UbsService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public listAll(): Observable<UbsDTO> {
    return this.http.get<UbsDTO>(`${this.apiUrl}/ubs`);
  }

  public getByFilter(filterParams: UbsFilterParams): Observable<UbsDTO> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UbsDTO>(`${this.apiUrl}/ubs/getByFilter`, { params: httpParams });
  }

  public listByFilter(filterParams: UbsFilterParams): Observable<UbsDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UbsDTO[]>(`${this.apiUrl}/ubs/filter`, { params: httpParams });
  }

  public listByMunicipio(filterParams: UbsFilterParams): Observable<UbsDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UbsDTO[]>(`${this.apiUrl}/ubs/listByMunicipio`, { params: httpParams });
  }

  public listByEstado(filterParams: UbsFilterParams): Observable<UbsDTO[]> {
    const httpParams = createHttpParams(filterParams);
    return this.http.get<UbsDTO[]>(`${this.apiUrl}/ubs/listByEstado`, { params: httpParams });
  }

  public getById(ubsId: number): Observable<UbsDTO> {
    return this.http.get<UbsDTO>(`${this.apiUrl}/ubs/${ubsId}`);
  }

  public create(ubs: UbsDTO): Observable<UbsDTO> {
    return this.http.post<UbsDTO>(`${this.apiUrl}/ubs`, ubs);
  }

  public update(ubs: UbsDTO): Observable<UbsDTO> {
    return this.http.put<UbsDTO>(`${this.apiUrl}/ubs/${ubs.id}`, ubs);
  }

  public deleteById(ubsId: number): Observable<UbsDTO> {
    return this.http.delete<UbsDTO>(`${this.apiUrl}/ubs/${ubsId}`);
  }

}
