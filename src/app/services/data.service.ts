import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Indice } from '../models/indice';
import { DadoPaciente } from '../models/dado-paciente';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  filterDocument(mes: number, ano: number, cidade: string): Observable<Indice[]> {
    const url = `${this.apiUrl}/indice/documento-filtro/${mes}/${ano}/${cidade}`;
    return this.http.get<Indice[]>(url);
  }

  filterPatient(ubsId: number | null, mes: number, ano: number, cidade: string): Observable<DadoPaciente[]> {
    let url = `${this.apiUrl}/indice/paciente-filtro/${mes}/${ano}/${cidade}`;

    if (ubsId !== null) {
      url += `?ubsId=${ubsId}`;
    }

    return this.http.get<DadoPaciente[]>(url);
  }

}
