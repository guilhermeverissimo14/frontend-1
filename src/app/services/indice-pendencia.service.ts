import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IndicePendencia } from '../models/IndicePendencia';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndicePendenciaService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  listIndicePendencia(mes:number, ano:number, cidade: string): Observable<IndicePendencia[]>{
    return this.http.get<IndicePendencia[]>(`${this.apiUrl}/indice/vistorias/${mes}/${ano}/${cidade}`)
  }

}
