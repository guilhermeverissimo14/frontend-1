import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UsuarioAdmGeralFilterParams, UsuarioDTO } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { Cidade, cidades } from '../shared/utils/cidades';
import { Role } from '../models/Role';
import { AuthService } from '../services/auth.service';
import { estados } from '../shared/utils/estados';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-painel-adm-geral-list',
  templateUrl: './painel-adm-geral-list.component.html',
  styleUrls: ['./painel-adm-geral-list.component.scss'],
})
export class PainelAdmGeralListComponent extends OnDestroyMixin implements OnInit {

  usuarios: UsuarioDTO[] = [];
  formFilter: FormGroup;
  mainForm: FormGroup;
  estados = estados;
  cidadeOptions = [];

  loading = false;

  constructor(
    private usuarioService:UsuarioService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.setFilterAdmEstadual();
    this.buildMainForm();
    this.listByFilter();
    if (this.formFilter.value.estado == null) {
      this.addCidadesOptions();
    } else {
      this.listCidadeByEstado()
    }
  }

  addCidadesOptions() {
    cidades.forEach((cidade) => {
      const cidadeObject = new Cidade(cidade.cidade)
      this.cidadeOptions.push(cidadeObject);
    });

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  listCidadeByEstado() {
    this.cidadeOptions = [];
    cidades.forEach((cidade) => {
      if (cidade.estado == this.formFilter.value.estado || this.formFilter.value.estado == null) {
        const cidadeObject = new Cidade(cidade.cidade)
        this.cidadeOptions.push(cidadeObject);
      }
    })

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      estado: [null],
      cidade: [null],
    });
  }

  setFilterAdmEstadual() {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.formFilter.value.estado = this.authService.authenticatedUser.estado
    }
  }

  buildMainForm() {
    this.mainForm = this.fb.group({
      nome: [null]
    });
  }

  deleteUserById(usuario: UsuarioDTO) {
    const confirm = window.confirm("Tem certeza que deseja excluir este usuário?")
    if(confirm) {
      this.usuarioService.deleteById(usuario).subscribe(
        (response) => {
          this.messageService.success('Usuário excluído com sucesso');
          this.listByFilter();
        },
        (error) => {
          console.error('Erro ao excluir usuário', error);
        }
      )}
  }

  listByFilter() {
    const filterParams: UsuarioAdmGeralFilterParams = {
      nome: this.mainForm.value.nome,
      estado: this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL' ? this.authService.authenticatedUser.estado :this.formFilter.value.estado,
      cidade: this.formFilter.value.cidade
    };
    console.log(this.formFilter.value.estado)
    this.loading = true;
    this.usuarioService.listByAdmGeralFilter(filterParams)
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

  handleCreate() {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL') {
      this.router.navigate(['painel-adm-geral', 'novo']);
    } else if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.router.navigate(['/usuarios-adm-estadual', 'novo']);
    } else {
      this.router.navigate(['/usuarios-adm-nacional', 'novo']);
    }
  }

  handleEdit(usuario: UsuarioDTO) {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL') {
      this.router.navigate(['/painel-adm-geral', usuario.id]);
    } else if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.router.navigate(['/usuarios-adm-estadual', usuario.id]);
    } else {
      this.router.navigate(['/usuarios-adm-nacional', usuario.id]);
    }
  }

  get isAdmEstadual() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL';
  }

  get isAdmGeral() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL';
  }

  get isAdmNacional() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_NACIONAL';
  }

  getRolename(tipoUsuario: any) {
    if (tipoUsuario == Role.ROLE_ADMINISTRADOR_GERAL) {
      return "Administrador Geral";
    } else if (tipoUsuario == Role.ROLE_ADMINISTRADOR_ESTADUAL) {
      return "Administrador Estadual";
    } else if (tipoUsuario == Role.ROLE_ADMINISTRADOR_MUNICIPAL) {
      return "Administrador Municipal";
    } else if (tipoUsuario == Role.ROLE_UBS) {
      return "UBS";
    } else if (tipoUsuario == Role.ROLE_PROFISSIONAL_UBS) {
      return "Profissional da UBS";
    } else {
      return "Agente de Endemias";
    }
  }

}
