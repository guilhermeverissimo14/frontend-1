import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../services/auth.service';
import { DocumentoAdmEstadualFilterParams, DocumentoAdmMunicipalFilterParams, DocumentoDTO } from '../models/Documento';
import { DocumentoService } from '../services/documento.service';
import { Cidade, cidades } from '../shared/utils/cidades';
import { estados } from '../shared/utils/estados';

@Component({
  selector: 'app-agente-endemias-adm-estadual',
  templateUrl: './agente-endemias-adm-estadual.component.html',
  styleUrls: ['./agente-endemias-adm-estadual.component.css']
})
export class AgenteEndemiasAdmEstadualComponent extends OnDestroyMixin implements OnInit {

  documentos: DocumentoDTO[] = [];
  formFilter: FormGroup;
  mainForm: FormGroup;

  estados = estados;
  estado = "";

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

  analiseOptions = [
    { label: 'Positivo', value: 'POSITIVO' },
    { label: 'Negativo', value: 'NEGATIVO' },
    { label: 'Pendente', value: 'PENDENTE' }
  ];

  cidadeOptions = [];

  shouldShowIntervencoes = false;
  shouldShowAnalises = false;
  shouldShowSemAcesso = false;
  shouldShowSemFoco = false;
  loading = false;

  constructor(
    private documentoService: DocumentoService,
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
    if (this.formFilter.value.estado == null) {
      this.addCidadesOptions();
    } else {
      this.listCidadeByEstado()
    }
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      ascendente: [null],
      cidade: [null]
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
    const filterParams: DocumentoAdmEstadualFilterParams = {
      nomeProprietario: this.formFilter.value.nomeProprietario,
      estado: this.authService.authenticatedUser.estado,
      cidade: this.formFilter.value.cidade
    };

    this.loading = true;
    this.documentoService.listByAdmEstadualFilter(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (documentos) => {
          this.documentos = documentos;
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

  getNomeArbovirose(tipoArbovirose: any) {
    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  handleCreate() {
    this.router.navigate(['agentes-endemias-adm-estadual', 'novo']);
  }

  handleView(documento: DocumentoDTO) {
    this.router.navigate(['agentes-endemias-adm-estadual', 'view', documento.id]);
  }

  showIntervencoes() {
    this.shouldShowIntervencoes = true;
    this.shouldShowAnalises = false;
    this.shouldShowSemAcesso = false
    this.shouldShowSemFoco = false
  }

  showAnalises() {
    this.shouldShowAnalises = true;
    this.shouldShowIntervencoes = false;
    this.shouldShowSemAcesso = false
    this.shouldShowSemFoco = false
  }

  showSemAcesso() {
    this.shouldShowSemAcesso = true;
    this.shouldShowIntervencoes = false;
    this.shouldShowAnalises = false;
    this.shouldShowSemFoco = false;
  }

  showSemFoco() {
    this.shouldShowSemFoco = true;
    this.shouldShowIntervencoes = false;
    this.shouldShowAnalises = false;
    this.shouldShowSemAcesso = false;
  }

  getTipoIntervencaoName(tipoIntervencao: any) {
    if (tipoIntervencao == 'EM_EXECUCAO') {
      return 'Em Execução';
    } else if (tipoIntervencao == 'PENDENTE') {
      return 'Pendente';
    }

    return 'Executado';
  }

  getTipoAnaliseName(tipoAnalise: any) {
    if (tipoAnalise == 'POSITIVO') {
      return 'Positivo';
    } else if (tipoAnalise == 'PENDENTE') {
      return 'Pendente';
    }

    return 'Negativo';
  }

  handleClicking(event: MouseEvent) {
    event.stopPropagation();
  }

}
