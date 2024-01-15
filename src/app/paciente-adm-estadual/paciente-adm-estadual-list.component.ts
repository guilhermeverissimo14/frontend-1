import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteAdmEstadualFilterParams, PacienteDTO } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Cidade, cidades } from '../shared/utils/cidades';
import { estados } from '../shared/utils/estados';
import { UbsService } from '../services/ubs.service';

@Component({
  selector: 'app-paciente-adm-estadual-list',
  templateUrl: './paciente-adm-estadual-list.component.html',
  styleUrls: ['./paciente-adm-estadual-list.component.css']
})
export class PacienteAdmEstadualListComponent extends OnDestroyMixin implements OnInit {

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

  estados = estados;
  estado =  "";

  ubsOptions = [];
  cidadeOptions = [];

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
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.buildMainForm();
    this.setFilterAdmEstadual();
    this.listByFilter();
    this.listUbsEstadual();
    if (this.formFilter.value.estado == null) {
      this.addCidadesOptions();
    } else {
      this.listCidadeByEstado()
    }
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      ascendente: [null],
      cidade: [null],
      estado: [null],
      tipoArbovirose: [null],
      ubs: [null]
    });
  }

  buildMainForm() {
    this.mainForm = this.fb.group({
      nome: [null]
    });
  }

  setFilterAdmEstadual() {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.formFilter.value.estado = this.authService.authenticatedUser.estado
    }
  }

  listByFilter() {
    const filterParams: PacienteAdmEstadualFilterParams = {
       nome: this.mainForm.value.nome,
       tipoArbovirose: this.formFilter.value.tipoArbovirose,
       ascendente: this.formFilter.value.ascendente,
       ubsId: this.formFilter.value.ubs,
       cidade: this.formFilter.value.cidade,
       estado: this.formFilter.value.estado
     };

     if (this.currentUserRole == 'ROLE_ADMINISTRADOR_NACIONAL') {
        filterParams.estado = this.formFilter.value.estado
     }

     this.loading = true;
     this.pacienteService.listByAdmEstadualFilter(filterParams)
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

  getNomeArbovirose(tipoArbovirose: any) {
    if (tipoArbovirose == 'FEBRE_AMARELA') {
      return "Febre Amarela";
    }

    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  listUbsEstadual() {
    const filterParams: any = {
      estado: this.authService.authenticatedUser.estado
    };

    if (this.currentUserRole == 'ROLE_ADMINISTRADOR_NACIONAL') {
        filterParams.estado = null;
    }

    this.ubsService.listByEstado(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (ubs) => {
          this.ubsOptions = ubs.map(ubs => ({ label: ubs.nome, value: ubs.id }));
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
    );
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

  get currentUserRole() {
    return this.authService.authenticatedUser.tipoUsuario;
  }

  handleView(paciente: PacienteDTO) {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_NACIONAL') {
      this.router.navigate(['pacientes-adm-nacional', 'view', paciente.id]);
    } else {
      this.router.navigate(['pacientes-adm-estadual', 'view', paciente.id]);
    }
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
