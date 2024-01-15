import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/Role';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UbsDTO } from '../models/Ubs';

export interface AuthenticatedUser {
  id: number;
  cpf: string;
  email: string;
  cidade: string;
  estado: string;
  tipoUsuario: Role;
  accessToken: string;
  tokenType: string;
  ubs: UbsDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private authenticatedUserSubject: BehaviorSubject<AuthenticatedUser | null>;
  private authenticatedUserObs: Observable<AuthenticatedUser | null>;
  private authenticatedUserRole: Role;

  constructor(
    private http: HttpClient
  ) {
    const authenticatedUser = this.getAuthenticatedUserFromLocalStorage();
    this.authenticatedUserSubject = new BehaviorSubject<AuthenticatedUser>(authenticatedUser);
    this.authenticatedUserObs = this.authenticatedUserSubject.asObservable();

    this.authenticatedUserSubject
      .subscribe(
        authenticatedUser => this.setAuthenticatedUserRole(authenticatedUser)
      );
  }

  private setAuthenticatedUserRole(user: AuthenticatedUser | null): void {
    if (user == null) {
      return;
    }

    if (user.tipoUsuario === Role.ROLE_ADMINISTRADOR_GERAL) {
      this.authenticatedUserRole = Role.ROLE_ADMINISTRADOR_GERAL;
    } else if (user.tipoUsuario === Role.ROLE_PROFISSIONAL_UBS) {
      this.authenticatedUserRole = Role.ROLE_PROFISSIONAL_UBS;
    }
  }

  private get userRole(): Role {
    return this.authenticatedUserRole;
  }

  public get isLoggedIn(): boolean {
    return this.authenticatedUser != null;
  }

  public get authenticatedUser(): AuthenticatedUser | null {
    return this.authenticatedUserSubject.value;
  }

  private saveAuthenticatedUserToLocalStorage(user: AuthenticatedUser): void {
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  }

  private getAuthenticatedUserFromLocalStorage(): any {
    const userJson = localStorage.getItem('authenticatedUser');
    return userJson != null ? JSON.parse(userJson) : null;
  }

  public get isAdministradorMunicipal(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_ADMINISTRADOR_MUNICIPAL;
  }

  public get isAdministradorEstadual(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_ADMINISTRADOR_ESTADUAL;
  }

  public get isAdministradorGeral(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_ADMINISTRADOR_GERAL;
  }

  public get isAdministradorNacional(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_ADMINISTRADOR_NACIONAL;
  }

  public get isUBS(): boolean {
    return this.authenticatedUser.tipoUsuario ==  Role.ROLE_UBS;
  }

  public get isProfissionalUBS(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_PROFISSIONAL_UBS;
  }

  public get isAgenteEndemias(): boolean {
    return this.authenticatedUser.tipoUsuario == Role.ROLE_AGENTE_ENDEMIAS;
  }

  public get userUbs(): UbsDTO {
    return this.authenticatedUser.ubs;
  }

  public login(email: string, senha: string): Observable<AuthenticatedUser> {

    return this.http.post<AuthenticatedUser>(`${this.apiUrl}/auth/login`, { email, senha})
      .pipe(
        tap(user => {
          console.log("Teste",user);
          this.saveAuthenticatedUserToLocalStorage(user);
          this.authenticatedUserSubject.next(user);
        })
      );
  }

  public logout() {
    localStorage.removeItem('authenticatedUser');
    this.authenticatedUserSubject.next(null);
  }

  public requestPasswordRecovery(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  public changePasswordByToken(token: string, newPassword: string): Observable<void> {
    const resetData = { token, password: newPassword };
        return this.http.put<void>(`${this.apiUrl}/auth/change-password`, resetData);
  }

}
