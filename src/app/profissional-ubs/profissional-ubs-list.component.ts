import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteCidadeFilterParams, PacienteDTO, PacienteUbsFilterParams } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { UbsService } from '../services/ubs.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profissional-ubs-list',
  templateUrl: './profissional-ubs-list.component.html',
  styleUrls: ['./profissional-ubs-list.component.css']
})
export class ProfissionalUbsListComponent extends OnDestroyMixin implements OnInit {

  pacientes: PacienteDTO[] = [];
  formFilter: FormGroup;
  mainForm: FormGroup;

  tiposArbovirose = [
    { label: 'Dengue', value: 'DENGUE' },
    { label: 'Chikungunya', value: 'CHIKUNGUNYA' },
    { label: 'Zika', value: 'ZIKA' },
    { label: 'Febre Amarela', value: 'FEBRE_AMARELA' },
    { label: 'Leishmaniose', value: 'LEISHMANIOSE' },
  ];

  ascendenteOptions = [
    { label: 'Ascendente', value: true },
    { label: 'Descendente', value: false }
  ];

  ubs: any[] = [];

  shouldShowPacientes = false;
  shouldShowAnalises = false;
  shouldShowResultados = false;
  loading = false;

  constructor(
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private ubsService: UbsService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(this.authService.authenticatedUser.ubs)
    this.buildFormFilter();
    this.buildMainForm();
    this.listByFilter();
    this.listUsuariosUbs();
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      ubs: [null],
      tipoArbovirose: [null],
      ascendente: []
    });
  }

  buildMainForm() {
    this.mainForm = this.fb.group({
      nome: [null]
    });
  }

  list() {
    const filterParams: PacienteCidadeFilterParams = {
      estado: this.authService.authenticatedUser.estado,
      cidade: this.authService.authenticatedUser.cidade
    };

    this.loading = true;
    console.log(filterParams)
    this.pacienteService.listByCidade(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (pacientes) => {
          this.pacientes = pacientes;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  listByFilter() {
    const filterParams: PacienteUbsFilterParams = {
      nome: this.mainForm.value.nome,
      tipoArbovirose: this.formFilter.value.tipoArbovirose,
      ascendente: this.formFilter.value.ascendente,
      ubsId: this.authService.authenticatedUser.ubs.id
     };

     this.loading = true;
     this.pacienteService.listByUbsFilter(filterParams)
       .pipe(untilComponentDestroyed(this))
       .subscribe(
         (pacientes) => {
          console.log(pacientes)
           this.pacientes = pacientes;
           this.loading = false;
         },
         (error) => {
           this.loading = false;
         }
       );
   }

  listUsuariosUbs() {
    const filterParams = {
      cidade: this.authService.authenticatedUser.cidade
    };

    this.ubsService.listByMunicipio(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (listUbs) => {
          this.ubs = listUbs.map(ubs => ({ label: ubs.nome, value: ubs.id }));
        }
      );
  }

  getNomeArbovirose(tipoArbovirose: any) {
    if (tipoArbovirose == 'FEBRE_AMARELA') {
      return "Febre Amarela";
    }

    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  handleCreate() {
    this.router.navigate(['painel-profissional-ubs', 'novo']);
  }

  handleView(paciente: PacienteDTO) {
    this.router.navigate(['painel-profissional-ubs', 'view', paciente.id]);
  }

  showPacientes() {
    this.shouldShowPacientes = true;
    this.shouldShowAnalises = false;
    this.shouldShowResultados = false
  }

  showAnalises() {
    this.shouldShowAnalises = true;
    this.shouldShowPacientes = false;
    this.shouldShowResultados = false
  }

  showResultados() {
    this.shouldShowResultados = true;
    this.shouldShowAnalises = false;
    this.shouldShowPacientes = false;
  }

  deletePaciente(paciente: PacienteDTO) {
    const confirm = window.confirm("Tem centeza que deseja apagar este paciente?");
    if (confirm) {
      this.pacienteService.deleteById(paciente)
        .subscribe(() => {
          this. listByFilter();
          this.messageService.success("Paciente excluido com sucesso!");
        }, error => {
          console.error(error);
        });
    }
  }

}
