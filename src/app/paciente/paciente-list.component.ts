import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteDTO, PacienteFilterParams, PacienteUbsFilterParams, TipoArbovirose } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AnalisePaciente } from '../models/analise-paciente.enum';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent extends OnDestroyMixin implements OnInit {

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

  estados = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
    { label: 'Distrito Federal', value: 'DF' }
  ];

  shouldShowPacientes = false;
  shouldShowAnalises = false;
  shouldShowResultados = false;
  loading = false;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.buildMainForm();
    this.listByFilter();
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      ascendente: [null],
      estado: [null],
      cidade: [null],
      tipoArbovirose: [null]
    });
  }

  buildMainForm() {
    this.mainForm = this.fb.group({
      nome: [null]
    });
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
           this.pacientes = pacientes;
           this.loading = false;
         },
         (error) => {
           this.loading = false;
         }
       );
   }

  getNomeArbovirose(tipoArbovirose: TipoArbovirose) {
    if (tipoArbovirose == 'FEBRE_AMARELA') {
      return "Febre Amarela";
    }

    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  getAnalisePaciente(analisePaciente: AnalisePaciente) {
    if (analisePaciente == 'EM_ANALISE') {
      return 'Em Análise';
    } else if (analisePaciente == 'POSITIVO') {
      return 'Positivo';
    }

    return 'Negativo';
  }

  handleCreate() {
    this.router.navigate(['painel-ubs', 'novo']);
  }

  handleView(paciente: PacienteDTO) {
    this.router.navigate(['painel-ubs', 'view', paciente.id]);
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
