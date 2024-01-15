import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoDTO } from 'src/app/models/Documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AnalisePaciente } from 'src/app/models/analise-paciente.enum';


@Component({
  selector: 'app-agente-endemia-view',
  templateUrl: './agente-endemia-view.component.html',
  styleUrls: ['./agente-endemia-view.component.css']
})
export class AgenteEndemiaViewComponent extends OnDestroyMixin implements OnInit {

  documento: DocumentoDTO;
  documentos: DocumentoDTO[] = [];

  @ViewChild('container') container: ElementRef;

  form: FormGroup;

  intervencaoOptions = [
    { label: 'Em Execução', value: 'EM_EXECUCAO' },
    { label: 'Executado', value: 'EXECUTADO' },
    { label: 'Pendente', value: 'PENDENTE' }
  ];

  arboviroseOptions = [
    { label: 'mosquito Anopheles', value: 'MALARIA' },
    { label: 'Aedes aegypti e Albopictus', value: 'FEBRE_AMARELA_URBANA' },
    { label: 'Haemagogus e o Sabethes', value: 'FEBRE_AMARELA_SILVESTRE' },
    { label: 'flebotomíneo (Lutzomyia longipalpis)', value: 'LEISHMANIOSE' },
    { label: 'Dengue - Aedes aegypti', value: 'DENGUE' },
    { label: 'Zika - Aedes aegypti', value: 'ZIKA' },
    { label: 'Chikungunya - Aedes aegypti', value: 'CHIKUNGUNYA' },
  ];

  analiseOptions = [
    { label: 'Positivo', value: 'POSITIVO' },
    { label: 'Negativo', value: 'NEGATIVO' },
    { label: 'Pendente', value: 'PENDENTE' }
  ];

  modalVisible = false;
  downloading = false;
  loading = false;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private location: Location,
    private fb: FormBuilder,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        ({ id }) => this.getDocumentoById(id)
      );
  }

  getDocumentoById(documentoId: number) {
    this.loading = true;
    this.documentoService.getByAgente(documentoId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (documento) => {
          this.loading = false;
          this.documento = documento;
        },
        (e) => {
          this.loading = false;
          this.router.navigate(['/agentes-endemias']);
        }
      );
  }

  buildForm() {
    this.form = this.fb.group({
      tipoAnalise: [this.documento.tipoAnalise],
      arbovirose: [this.documento.tipoArbovirose],
      tipoIntervencao: [this.documento.tipoIntervencao]
    });
  }

  getTipoImovelNome(tipoImovel: any) {
    if (tipoImovel == 'TERRENO_BALDIO') {
      return "Terreno Baldio";
    } else if (tipoImovel == 'RESIDENCIA_SEM_ARMADILHA') {
      return "Residência (Sem Armadilha)"
    } else if (tipoImovel == 'RESIDENCIA_COM_ARMADILHA') {
      return "Residência (Com Armadilha)"
    } else if (tipoImovel == 'PONTO_ESTRATEGICO') {
      return "Ponto Estratégico";
    } else if (tipoImovel == 'COMERCIO') {
      return "Comércio";
    }

    return "Outro";
  }

  goBack() {
    this.location.back();
  }

  handleSubmit() {
    this.loading = true;
    this.doSubmit()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (success) => {
          this.messageService.success('Informações atualizadas com sucesso 😃');
          this.handleCloseModal();
          this.router.navigate(['agentes-endemias']);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  doSubmit() {
    const params = {
      ...this.form.value,
    };
    return this.documentoService.updateByAdm(this.documento?.id, params);
  }

  handleEdit() {
    this.modalVisible = true;
    this.buildForm();
  }

  handleCloseModal() {
    this.modalVisible = false;
  }

  handleDownload() {
    this.downloading = true;
    html2canvas(this.container.nativeElement, { scale: 4}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'relatorio-paciente.png';
      link.href = imgData;
      this.downloading = false;
      link.click();
    });
  }

  getCepFormatado(value: any) {
    if (!value) {
        return '';
    }

    const cep = value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return cep;
    }

    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  getTipoDeposito(tipoDeposito: any) {
    switch (tipoDeposito) {
      case 'A1':
        return 'Depósito de Água (elevado)';
      case 'A2':
        return 'Depósito de Água (nível do solo)';
      case 'B':
        return 'Depósitos Móveis';
      case 'C':
        return 'Depósitos Fixos';
      case 'D1':
        return 'Pneus e outros materiais rodantes';
      case 'D2':
        return 'Resíduos Sólidos';
      case 'E':
        return 'Depósitos Naturais';
      default:
        return 'Outros depósitos de armazenamento';
    }
  }

  getTipoIntervencaoName(tipoIntervencao: AnalisePaciente) {
    if (tipoIntervencao == 'POSITIVO') {
      return 'EXECUTADO';
    } else if (tipoIntervencao == 'NEGATIVO') {
      return 'PENDENTE';
    }
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

  getTipoArbovirose(tipoArbovirose: any) {
    switch (tipoArbovirose) {
      case 'MALARIA':
        return 'mosquito Anopheles';
      case 'FEBRE_AMARELA_URBANA':
        return 'Aedes aegypti e Albopictus';
      case 'FEBRE_AMARELA_SILVESTRE':
        return 'Haemagogus e o Sabethes';
      case 'LEISHMANIOSE':
        return 'flebotomíneo';
      case 'DENGUE':
        return 'Dengue - Aedes aegypti';
      case 'ZIKA':
        return 'Zika - Aedes aegypti';
      default:
        return 'Chikungunya - Aedes aegypti';
    }
  }

}
