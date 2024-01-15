import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgenteEndemiaDTO } from '../models/AgenteEndemia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgenteEndemiaService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public listAll(): Observable<AgenteEndemiaDTO[]> {
    return this.http.get<AgenteEndemiaDTO[]>(`${this.apiUrl}/agente-endemia`);
  }

  public getById(agenteEndemiaId: number): Observable<AgenteEndemiaDTO> {
    return this.http.get<AgenteEndemiaDTO>(`${this.apiUrl}/agente-endemia/${agenteEndemiaId}`);
  }

  public create(agenteEndemia: AgenteEndemiaDTO): Observable<AgenteEndemiaDTO> {
    return this.http.post<AgenteEndemiaDTO>(`${this.apiUrl}/agente-endemia`, agenteEndemia);
  }

  public update(agenteEndemia: AgenteEndemiaDTO): Observable<AgenteEndemiaDTO> {
    return this.http.put<AgenteEndemiaDTO>(`${this.apiUrl}/agente-endemia/${agenteEndemia.id}`, agenteEndemia);
  }

  public deleteById(agenteEndemiaId: number): Observable<AgenteEndemiaDTO> {
    return this.http.delete<AgenteEndemiaDTO>(`${this.apiUrl}/agente-endemia/${agenteEndemiaId}`);
  }

}
