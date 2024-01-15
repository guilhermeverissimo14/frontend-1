import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoDTO } from 'src/app/models/Documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-documento-view',
  templateUrl: './documento-view.component.html',
  styleUrls: ['./documento-view.component.css']
})
export class DocumentoViewComponent extends OnDestroyMixin implements OnInit {

  documento: DocumentoDTO;

  @ViewChild('container') container: ElementRef;

  downloading = false;
  loading = false;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private location: Location
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
          this.router.navigate(['/documentos']);
        }
      );
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

  goBack() {
    this.location.back();
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

}
