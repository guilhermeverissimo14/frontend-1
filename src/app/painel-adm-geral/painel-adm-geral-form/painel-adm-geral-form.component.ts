import { Component, Input, OnInit } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/utils/base-form';
import { Location } from '@angular/common';
import { UsuarioDTO } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cidade, cidades } from 'src/app/shared/utils/cidades';
import { AuthService } from 'src/app/services/auth.service';
import { estados } from 'src/app/shared/utils/estados';
import { UbsService } from 'src/app/services/ubs.service';
import { UbsCadastroDTO, UbsDTO } from 'src/app/models/Ubs';

@Component({
  selector: 'app-painel-adm-geral-form',
  templateUrl: './painel-adm-geral-form.component.html',
  styleUrls: ['./painel-adm-geral-form.component.css']
})
export class PainelAdmGeralFormComponent extends BaseFormComponent implements OnInit {

  @Input() usuario: UsuarioDTO | null = null;

  tiposUsuario = [
    { label: 'Profissional da UBS', value: 'ROLE_PROFISSIONAL_UBS' },
    { label: 'Agente de Endemias', value: 'ROLE_AGENTE_ENDEMIAS' },
    { label: 'Administrador Municipal', value: 'ROLE_ADMINISTRADOR_MUNICIPAL' },
    { label: 'Administrador Estadual', value: 'ROLE_ADMINISTRADOR_ESTADUAL' }
  ];

  regiaoGeograficaOptions = [
    { label: 'Zona Sul', value: 'ZONA_SUL' },
    { label: 'Zona Norte', value: 'ZONA_NORTE' },
    { label: 'Zona Leste', value: 'ZONA_LESTE' },
    { label: 'Zona Oeste', value: 'ZONA_OESTE' },
    { label: 'Centro', value: 'CENTRO' },
    { label: 'Bairro', value: 'BAIRRO' }
  ];

  cidadeOptions = [];
  estado = "";
  estados = estados;
  ubsOptions:UbsCadastroDTO[] = [];
  ubs: UbsDTO | null = null

  constructor(
    private usuarioService: UsuarioService,
    private ubsService: UbsService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    protected messageService: NzMessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.addCidadesOptions();

    if (this.authService.authenticatedUser.tipoUsuario == "ROLE_ADMINISTRADOR_GERAL") {
      this.removeTipoUsuario('ROLE_PROFISSIONAL_UBS')
    }

    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.getEstadoNomeBySigla();
    }

    if (this.isEditing) {
      this.buildEditForm();
    } else {
      this.buildCreateForm();
    }

    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.listCidadeByEstado();
    }

    this.addUbsOptions();
    
  }

  removeTipoUsuario(role: string) {
    for (let i = 0; i < this.tiposUsuario.length; i++) {
      if (this.tiposUsuario[i].value == role) {
          this.tiposUsuario.splice(i, 1);
          console.log(this.tiposUsuario)
      }
  }
  }

  getEstadoNomeBySigla() {
    const estadoSigla = this.authService.authenticatedUser.estado;
    const estadoNome = estados[estados.findIndex((element) => element.value == estadoSigla)].label;
    this.estado = estadoNome;
  }

  getEstadoSiglaByNome() {
    const estadoNome = this.estado;
    const estadoSigla = estados[estados.findIndex((element) => element.label == estadoNome)].value;
    return estadoSigla;
  }

  buildEditForm() {
    this.form = this.fb.group({
      tipoUsuario: [{ value: this.usuario?.tipoUsuario, disabled: this.isEditing }, Validators.required],
      nome: [{ value: this.usuario?.nome, disabled: this.loggedInUserAdmEstadualOrNacional }, Validators.required],
      email: [{ value: this.usuario?.email, disabled: this.loggedInUserAdmEstadualOrNacional }, [Validators.required, Validators.email]],
      cpf: [{ value: this.usuario?.cpf, disabled: this.loggedInUserAdmEstadualOrNacional}, [Validators.required, Validators.minLength(14)]],
      ubs: [{value: this.usuario?.ubs, disabled: true}],
      estado: [{ value: this.usuario?.estado, disabled: this.loggedInUserAdmEstadualOrNacional }],
      cidade: [{ value: this.usuario?.municipio, disabled: this.loggedInUserAdmEstadualOrNacional }],
      regiaoGeografica: [{ value: this.usuario?.regiaoGeografica, disabled: this.loggedInUserAdmEstadualOrNacional }]
    });
  }

  buildCreateForm() {
    this.form = this.fb.group({
      tipoUsuario: [{ value: this.usuario?.tipoUsuario, disabled: this.isEditing }, Validators.required],
      nome: [this.usuario?.nome, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
      cpf: [this.usuario?.cpf, [Validators.required, Validators.minLength(14)]],
      senha: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      ubs: [this.usuario?.ubs],
      estado: [{ value: this.estado, disabled: this.loggedInUserAdmEstadualOrNacional }],
      cidade: [this.usuario?.municipio],
      regiaoGeografica: [this.usuario?.regiaoGeografica]
    });
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
    const sigla = this.form.value.estado != null ? this.form.value.estado : this.getEstadoSiglaByNome();
    cidades.forEach((cidade) => {
      if (cidade.estado == sigla || sigla == null) {
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

  addUbsOptions() {
    this.ubsOptions=[];
    const params = {
      estado: this.getEstadoSiglaByNome(),
      cidade: this.form.value.cidade
    }
    this.ubsService.listByEstado(params).
    pipe(untilComponentDestroyed(this))
    .subscribe((ubs) => {
      ubs.forEach((ubs:UbsDTO ,index:number):any => {
        const ubsNova:UbsCadastroDTO = {value: ubs.id, label: `${ubs.nome} CNES:${ubs.cnes}`}
        this.ubsOptions.push(ubsNova);
      });
    });    
  }

  get isCreating() {
    return this.usuario == null;
  }

  get isEditing() {
    return this.usuario != null;
  }

  get isProfissionalUbs() {
    return this.form.get('tipoUsuario').value == 'ROLE_PROFISSIONAL_UBS';
  }

  get isAgenteEndemiasOrAdmMunicipal() {
    return this.form.get('tipoUsuario').value == 'ROLE_AGENTE_ENDEMIAS' || this.form.get('tipoUsuario').value == 'ROLE_ADMINISTRADOR_MUNICIPAL';
  }

  get isAdmEstadual() {
    const tipoUsuarioControl = this.form.get('tipoUsuario').value;

    return tipoUsuarioControl == 'ROLE_ADMINISTRADOR_ESTADUAL';
  }

  get isAdmGeral() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL';
  }

  get loggedInUserAdmEstadual() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL';
  }

  get loggedInUserAdmEstadualOrNacional() {
    return this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_NACIONAL' || this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL';
  }

  doSubmit(): Observable<any> {
    const params = {
      id: this.usuario?.id,
      municipio: this.form.value.cidade,
      ubs: this.form.value.ubs,
      ...this.form.value,
    }
    console.log("submite")
    console.log(params)

    if (this.isEditing) {
        params.tipoUsuario = this.usuario?.tipoUsuario;
    } else {
      if (this.form.controls.senha.value != this.form.controls.confirmPassword.value) {
        this.messageService.warning('As senhas não coincidem!');
        return;
      }
    }

    if (this.form.controls.tipoUsuario.value == 'ROLE_PROFISSIONAL_UBS' && this.form.controls.ubs.value == null) {
      this.messageService.warning('Informe a UBS!');
      return;
    }

    if (this.form.controls.tipoUsuario.value == 'ROLE_AGENTE_ENDEMIAS' && (this.form.controls.estado.value == null || this.form.controls.cidade.value == null)) {
      this.messageService.warning('É preciso informar o Estado e Cidade do Agente de Endemias!');
      return;
    }

    if (this.isCreating) {
      return this.usuarioService.create(params);
    } else {
      return this.usuarioService.update(params);
    }
  }

  onSubmitSuccess(): void {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL') {
      this.router.navigate(['painel-adm-geral']);
    } else {
      this.router.navigate(['usuarios-adm-nacional']);
    }

    if (this.isCreating) {
      this.messageService.success('Usuário criado com sucesso');
    } else {
      this.messageService.success('Usuário atualizado com sucesso');
    }
  }

  goBack() {
    this.location.back();
  }

  handleKeyPress(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  handleCpfMaxDigits(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (
      input.value.length >= 14 &&
      event.keyCode !== 8 &&
      event.keyCode !== 46
    ) {
      event.preventDefault();
    }
  }

  verifyUbsExists(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const params = {
      cnes: value,
    }
    this.loading = true;

    this.ubsService.getByFilter(params)
    .pipe(untilComponentDestroyed(this))
    .subscribe(
      (ubs) => {
        this.ubs = ubs;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.error('Não existe UBS com esse CNES cadastrado!');
        this.form.get('cnes').setValue("");
      });
  }

  get cpfControl() {
    return this.form.get('cpf') as FormControl;
  }

  getCpfFormatado(value: any) {
    if (!value) {
      return '';
    }

    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
