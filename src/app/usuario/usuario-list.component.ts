import { Component, OnInit } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDTO, UsuarioFilterParams } from '../models/Usuario';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent extends OnDestroyMixin implements OnInit {

  usuarios: UsuarioDTO[] = [];

  filterForm: FormGroup;

  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFilterForm();
    this.list();
    //console.log(this.authService.authenticatedUser.)
  }

  list() {
    const filterParams: UsuarioFilterParams = {
      nome: this.filterForm.value.nome,
      cidade: this.authService.authenticatedUser.cidade
    };
    this.loading = true;
    this.usuarioService.listByFilter(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      nome: [null]
    });
  }

  listByFilter() {
    const filterParams: UsuarioFilterParams = {
      nome: this.filterForm.value.nome,
      cidade: this.authService.authenticatedUser.cidade
    };

    this.loading = true;
    this.usuarioService.listByFilter(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getCustomRoleName(tipoUsuario: any) {
    if (tipoUsuario == Role.ROLE_UBS) {
      return "UBS";
    } else if (tipoUsuario == Role.ROLE_AGENTE_ENDEMIAS) {
      return "Agente de Endemias";
    } else if (tipoUsuario == Role.ROLE_PROFISSIONAL_UBS) {
      return "Profissional da UBS";
    } else if (tipoUsuario == Role.ROLE_ADMINISTRADOR_MUNICIPAL) {
      return "Administrador Municipal";
    }
  }

  handleCreate() {
    this.router.navigate(['usuario', 'novo']);
  }

  handleEdit(usuario: UsuarioDTO) {
    this.router.navigate(['usuario', usuario.id]);
  }

}
