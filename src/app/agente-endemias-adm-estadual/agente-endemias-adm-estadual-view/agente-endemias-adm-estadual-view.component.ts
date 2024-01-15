import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoDTO } from 'src/app/models/Documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isFormInvalid } from 'src/app/shared/utils/form-utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-agente-endemias-adm-estadual-view',
  templateUrl: './agente-endemias-adm-estadual-view.component.html',
  styleUrls: ['./agente-endemias-adm-estadual-view.component.css']
})
export class AgenteEndemiasAdmEstadualViewComponent extends OnDestroyMixin implements OnInit {

  documento: DocumentoDTO;

  @ViewChild('container') container: ElementRef;

  form: FormGroup;

  intervencaoOptions = [
    { label: 'Em Execução', value: 'EM_EXECUCAO' },
    { label: 'Executado', value: 'EXECUTADO' },
    { label: 'Pendente', value: 'PENDENTE' }
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
    this.documentoService.getById(documentoId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (documento) => {
          this.loading = false;
          this.documento = documento;
        },
        (e) => {
          this.loading = false;
          this.router.navigate(['/agentes-endemias-adm-estadual']);
        }
      );
  }

  buildForm() {
    this.form = this.fb.group({
        nome: [this.documento?.nomeProprietario, Validators.required],
        cpf: [this.getCpfFormatado(this.documento?.cpfProprietario), [Validators.required, Validators.minLength(14)]],
        dataNascimento: [this.documento?.dataNascimentoProprietario, Validators.required],
        intervencao: [this.documento?.tipoIntervencao, Validators.required],
        analiseLaboratorio: [this.documento?.tipoAnalise, Validators.required]
    });
  }

  onTypingDate(event: any) {
    event.target.value = event.target.value
      .replace(/^(\d\d)(\d)$/g, '$1/$2')
      .replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2')
      .replace(/[^\d\/]/g, '');
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

  get cpfControl() {
    return this.form.get('cpf') as FormControl;
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
    if (isFormInvalid(this.form)) {
        this.messageService.warning('Preencha os campos obrigatórios!');
        return;
    }

    this.loading = true;
    this.doSubmit()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (success) => {
          this.messageService.success('Informações atualizadas com sucesso');
          this.handleCloseModal();
          this.router.navigate(['agentes-endemias-adm-estadual']);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  toDate(dateStr: string) {
    const parts = dateStr.split('/');
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  doSubmit(): Observable<any> {
    const params = {
       ...this.form.value,
       cpf: this.cpfControl.value.replace(/[^\d]+/g, ''),
       dataNascimento: format(this.toDate(this.form.value.dataNascimento), 'yyyy-MM-dd'),
    };

    const newBirthdate = new Date(params.dataNascimento);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    if (newBirthdate >= tomorrowDate) {
      return new Observable(observer => {
          this.messageService.error('A data de nascimento não deve ser superior a atual');
          this.loading = false;
          observer.complete();
          return;
      });
    }

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

}
