import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteCidadeFilterParams, PacienteDTO, PacienteUbsFilterParams } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { UbsService } from '../services/ubs.service';

@Component({
  selector: 'app-ubs-municipal',
  templateUrl: './ubs-municipal.component.html',
  styleUrls: ['./ubs-municipal.component.css']
})
export class UbsMunicipalComponent extends OnDestroyMixin implements OnInit {

  pacientes: PacienteDTO[] = [];
  formFilter: FormGroup;
  mainForm: FormGroup;

  ubs: any[] = [];

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

  shouldShowPacientes = false;
  shouldShowAnalises = false;
  shouldShowResultados = false;
  loading = false;

  constructor(
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private ubsService: UbsService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.buildMainForm();
    this.listUsuariosUbs();
    this.list();
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
    this.pacienteService.listByCidade(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (pacientes) => {
          this.pacientes = pacientes;
          console.log("console listByCidade", this.pacientes);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getAnalisePaciente(analisePaciente: any) {
    if (analisePaciente == 'EM_ANALISE') {
      return 'Em Análise';
    } else if (analisePaciente == 'POSITIVO') {
      return 'Positivo';
    }

    return 'Negativo';
  }

  listByFilter() {
    const filterParams: PacienteUbsFilterParams = {
       nome: this.mainForm.value.nome,
       tipoArbovirose: this.formFilter.value.tipoArbovirose,
       ascendente: this.formFilter.value.ascendente,
       ubsId: this.formFilter.value.ubs
     };

     this.loading = true;
     this.pacienteService.listByUbsFilter(filterParams)
       .pipe(untilComponentDestroyed(this))
       .subscribe(
         (pacientes) => {
          console.log("console do filtro listByUbsFilter", pacientes);
           this.pacientes = pacientes.filter(p => p.cidade == this.authService.authenticatedUser.cidade)
           this.loading = false;

         },
         (error) => {
           this.loading = false;
         }
       );
   }

  listUsuariosUbs() {
    const filterParams = {
      estado: this.authService.authenticatedUser.estado,
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

  handleCreate() {
    this.router.navigate(['ubs-municipal', 'novo']);
  }

  handleView(paciente: PacienteDTO) {
    this.router.navigate(['ubs-municipal', 'view', paciente.id]);
  }

  getNomeArbovirose(tipoArbovirose: any) {
    if (tipoArbovirose == 'FEBRE_AMARELA') {
      return "Febre Amarela";
    }

    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
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

}
