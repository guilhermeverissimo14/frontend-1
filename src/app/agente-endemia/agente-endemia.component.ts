import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../services/auth.service';
import { DocumentoAdmMunicipalFilterParams, DocumentoDTO } from '../models/Documento';
import { DocumentoService } from '../services/documento.service';
import { estados } from '../shared/utils/estados';
import { AnalisePaciente } from '../models/analise-paciente.enum';
import { Indice } from '../models/indice';
import { IndicePendenciaService } from '../services/indice-pendencia.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-agente-endemia',
  templateUrl: './agente-endemia.component.html',
  styleUrls: ['./agente-endemia.component.css']
})
export class AgenteEndemiaComponent extends OnDestroyMixin implements OnInit {
  indiceBreteu: boolean = false;
  documentos: DocumentoDTO[] = [];
  indiceDocumento: Indice[] = [];
  indice: Indice;
  formFilter: FormGroup;
  mainForm: FormGroup;
  originalDocumentos: DocumentoDTO[] = [];


  meses = [
    { nome: 'Janeiro', valor: 1 },
    { nome: 'Fevereiro', valor: 2 },
    { nome: 'Março', valor: 3 },
    { nome: 'Abril', valor: 4 },
    { nome: 'Maio', valor: 5 },
    { nome: 'Junho', valor: 6 },
    { nome: 'Julho', valor: 7 },
    { nome: 'Agosto', valor: 8 },
    { nome: 'Setembro', valor: 9 },
    { nome: 'Outubro', valor: 10 },
    { nome: 'Novembro', valor: 11 },
    { nome: 'Dezembro', valor: 12 },
  ];

  anos = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  mesSelecionado: number;
  anoSelecionado: number;

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

  shouldShowIntervencoes = false;
  shouldShowAnalises = false;
  shouldShowSemAcesso = false;
  shouldShowSemFoco = false;
  loading = false;

  constructor(
    private documentoService: DocumentoService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService:DataService
  ) {
    super();
  }

  ngOnInit(): void {
    const mesAtual = new Date().getMonth() + 1;
    this.mesSelecionado = mesAtual;
    const anoAtual = new Date().getFullYear();
    this.anoSelecionado = anoAtual;

    this.buildFormFilter();
    this.buildMainForm();
    this.listByFilter();
  }

  indiceBreteau() {
    const cidade = this.authService.authenticatedUser.cidade;

    this.dataService.filterDocument(this.mesSelecionado, this.anoSelecionado, cidade)
      .subscribe((dados: any) => {
        this.indiceDocumento = dados.documentos;
        this.indiceBreteu = true;
      });
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
    const filterParams: DocumentoAdmMunicipalFilterParams = {
      nomeProprietario: this.formFilter.value.nomeProprietario,
      estado: this.authService.authenticatedUser.estado,
      cidade: this.authService.authenticatedUser.cidade
    };
    this.loading = true;
    this.documentoService.listByAdmMunicipalFilter(filterParams)
      .pipe()
      .subscribe(
        (documentos) => {
          this.originalDocumentos = documentos;
          this.applyFilters();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  getNomeArbovirose(tipoArbovirose: any) {
    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  handleCreate() {
    this.router.navigate(['agentes-endemias', 'novo']);
  }

  handleView(documento: DocumentoDTO) {
    this.router.navigate(['agentes-endemias', 'view', documento.id]);
  }

  applyFilters() {
    let filteredDocumentos = [...this.originalDocumentos];

    if (this.shouldShowSemAcesso) {
      filteredDocumentos = filteredDocumentos.filter(documento => documento.acessoImovel === false);
    }

    if (this.shouldShowSemFoco) {
      filteredDocumentos = filteredDocumentos.filter(documento => documento.presencaLarva === false && documento.presencaCriadouros === false);
    }

    if (this.shouldShowAnalises) {
      filteredDocumentos = filteredDocumentos.filter(documento =>
        documento.presencaLarva && documento.coleta && documento.tratamentoLarvicida
      );

    }

    if (this.shouldShowIntervencoes) {
      filteredDocumentos = filteredDocumentos.filter(documento => documento.presencaCriadouros === true);

    }

    this.documentos = filteredDocumentos;
  }

  listarDocumentosSemAcesso() {
    this.indiceBreteu = false;
    this.showSemAcesso();
    this.applyFilters();
  }

  listarDocumentosIntervencao() {
    this.indiceBreteu = false;
    this.showIntervencoes();
    this.applyFilters();
  }

  listarDocumentosSemFoco() {
    this.indiceBreteu = false;
    this.showSemFoco();
    this.applyFilters();
  }

  listarDocumentosAnalisePendente() {
    this.indiceBreteu = true;
    this.showAnalises();
    this.applyFilters();
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

  handleClicking(event: MouseEvent) {
    console.log('clik');
    event.stopPropagation();
  }

  getTipoAnaliseName(tipoAnalise: AnalisePaciente) {
    switch (tipoAnalise) {
      case AnalisePaciente.POSITIVO:
        return 'Positivo';
      case AnalisePaciente.NEGATIVO:
        return 'Negativo';
      default:
        return 'Em Análise';
    }
  }

  getTipoIntervencaoName(tipoIntervencao: AnalisePaciente) {
    if (tipoIntervencao == 'POSITIVO') {
      return 'EXECUTADO';
    } else if (tipoIntervencao == 'NEGATIVO') {
      return 'PENDENTE';
    }
  }
}
