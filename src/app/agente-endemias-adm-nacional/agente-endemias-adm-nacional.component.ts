import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoAdmNacionalFilterParams, DocumentoDTO } from '../models/Documento';
import { DocumentoService } from '../services/documento.service';
import { Cidade, cidades } from '../shared/utils/cidades';

@Component({
  selector: 'app-agente-endemias-adm-nacional',
  templateUrl: './agente-endemias-adm-nacional.component.html',
  styleUrls: ['./agente-endemias-adm-nacional.component.css']
})
export class AgenteEndemiasAdmNacionalComponent extends OnDestroyMixin implements OnInit {

  documentos: DocumentoDTO[] = [];
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
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.buildMainForm();
    this.listByFilter();
    this.addCidadesOptions();
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      ascendente: [null],
      estado: [null],
      cidade: [null]
    });
  }

  buildMainForm() {
    this.mainForm = this.fb.group({
      nome: [null]
    });
  }

  listByFilter() {
    const filterParams: DocumentoAdmNacionalFilterParams = {
      nomeProprietario: this.formFilter.value.nomeProprietario,
      estado: this.formFilter.value.estado,
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

  getNomeArbovirose(tipoArbovirose: any) {
    return tipoArbovirose.charAt(0).toUpperCase() + tipoArbovirose.slice(1).toLowerCase();
  }

  handleCreate() {
    this.router.navigate(['agentes-endemias-adm-nacional', 'novo']);
  }

  handleView(documento: DocumentoDTO) {
    this.router.navigate(['agentes-endemias-adm-nacional', 'view', documento.id]);
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
