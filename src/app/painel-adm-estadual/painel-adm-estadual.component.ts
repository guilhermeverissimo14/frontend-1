import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';
import { DocumentoService } from '../services/documento.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-painel-adm-estadual',
  templateUrl: './painel-adm-estadual.component.html',
  styleUrls: ['./painel-adm-estadual.component.scss']
})
export class PainelAdmEstadualComponent extends OnDestroyMixin implements OnInit {

  @ViewChild('container') container: ElementRef;
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

  form: FormGroup;

  relatorios: any[] = [];
  documentos: any[] = [];
  baixoRiscoOptions;
  medioRiscoOptions;
  altoRiscoOptions;

  documentosZonaSul: any[] | any = [];
  documentosZonaNorte: any[] | any = [];
  documentosZonaLeste: any[] | any = [];
  documentosZonaOeste: any[] | any = [];
  documentosCentro: any[] | any = [];
  documentosBairro: any[] | any= [];

  totalPorcentagemDepositosInspecionados = { a1: 0, a2: 0, b: 0, c: 0, d1: 0, d2: 0, e: 0, total: 0};

  lat = -23.310546;
  lng = -51.169392;

  single: any[]; // dados do objeto

  view: any[] = [800, 400];

  // configurações do gráfico de barras
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Tipo de Depósito';
  yAxisLabel = 'Quantidade';

  colorScheme = {
    domain: ['#00d97e', '#bf2446', '#feb236', '#1e90ff', '#3e4444', '#ffef96', '#6b5b95']
  };

  downloading = false;
  graphVisible = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private documentoService: DocumentoService,
  ) {
    super();
  }

  async ngOnInit() {
    this.buildForm();
    //await this.searchDocumentos();
    this.handleGoogleMaps();
  }

  buildForm() {
    this.form = this.fb.group({
      data: []
    });
  }



  handleGoogleMaps() {
    const geocoder = new google.maps.Geocoder();
    const currentEstado = this.getNomeEstado(this.authService.authenticatedUser.estado);
    geocoder.geocode({ address: currentEstado }, (results: any, status: any) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat, lng },
          zoom: 7
        });
      }
    });
  }

  // async searchDocumentos() {
  //   const uf = this.authService.authenticatedUser.estado;
  //   this.loading = true;

  //   try {
  //     const documentos = await this.documentoService.listByEstado(uf).toPromise();
  //     this.documentos = documentos;
  //     this.documentosZonaSul = documentos.filter(d => d.usuario.regiaoGeografica == 'ZONA_SUL');
  //     this.documentosZonaNorte = documentos.filter(d => d.usuario.regiaoGeografica == 'ZONA_NORTE');
  //     this.documentosZonaLeste = documentos.filter(d => d.usuario.regiaoGeografica == 'ZONA_LESTE');
  //     this.documentosZonaOeste = documentos.filter(d => d.usuario.regiaoGeografica == 'ZONA_OESTE');
  //     this.documentosCentro = documentos.filter(d => d.usuario.regiaoGeografica == 'CENTRO');
  //     this.documentosBairro = documentos.filter(d => d.usuario.regiaoGeografica == 'BAIRRO');
  //     this.mapDocumentosZonaSul();
  //     this.mapDocumentosZonaNorte();
  //     this.mapDocumentosZonaLeste();
  //     this.mapDocumentosZonaOeste();
  //     this.mapDocumentosCentro();
  //     this.mapDocumentosBairro();

  //     this.totalPorcentagemDepositosInspecionados.total =
  //       this.documentosZonaSul.total +
  //       this.documentosZonaNorte.total +
  //       this.documentosZonaLeste.total +
  //       this.documentosZonaOeste.total +
  //       this.documentosCentro.total +
  //       this.documentosBairro.total;

  //     for (const documento of this.documentos) {
  //       const index = this.single.findIndex(item => item.name === documento.tipoDeposito);
  //       if (index !== -1) {
  //         this.single[index].value++;
  //       }
  //     }

  //     this.graphVisible = true;
  //     this.loading = false;
  //   } catch (error) {
  //     this.loading = false;
  //   }
  // }



  disabledDate = (current: Date): boolean => {
    return current.getTime() > Date.now();
  };

  getNomeEstado(sigla: string) {
    switch (sigla.toUpperCase()) {
      case 'AC':
        return 'Acre';
      case 'AL':
        return 'Alagoas';
      case 'AP':
        return 'Amapá';
      case 'AM':
        return 'Amazonas';
      case 'BA':
        return 'Bahia';
      case 'CE':
        return 'Ceará';
      case 'DF':
        return 'Distrito Federal';
      case 'ES':
        return 'Espírito Santo';
      case 'GO':
        return 'Goiás';
      case 'MA':
        return 'Maranhão';
      case 'MT':
        return 'Mato Grosso';
      case 'MS':
        return 'Mato Grosso do Sul';
      case 'MG':
        return 'Minas Gerais';
      case 'PA':
        return 'Pará';
      case 'PB':
        return 'Paraíba';
      case 'PR':
        return 'Paraná';
      case 'PE':
        return 'Pernambuco';
      case 'PI':
        return 'Piauí';
      case 'RJ':
        return 'Rio de Janeiro';
      case 'RN':
        return 'Rio Grande do Norte';
      case 'RS':
        return 'Rio Grande do Sul';
      case 'RO':
        return 'Rondônia';
      case 'RR':
        return 'Roraima';
      case 'SC':
        return 'Santa Catarina';
      case 'SP':
        return 'São Paulo';
      case 'SE':
        return 'Sergipe';
      case 'TO':
        return 'Tocantins';
      default:
        return null;
    }
  }

  mapDocumentosZonaSul() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosZonaSul.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        this.totalPorcentagemDepositosInspecionados.a1++;
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        this.totalPorcentagemDepositosInspecionados.a2++;
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        this.totalPorcentagemDepositosInspecionados.b++;
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        this.totalPorcentagemDepositosInspecionados.c++
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        this.totalPorcentagemDepositosInspecionados.d1++;
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        this.totalPorcentagemDepositosInspecionados.d2++;
        contador.columnSix++;
      } else {
        this.totalPorcentagemDepositosInspecionados.e++;
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosZonaSul = contador;
  }

  mapDocumentosZonaNorte() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosZonaNorte.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        this.totalPorcentagemDepositosInspecionados.a1++;
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        this.totalPorcentagemDepositosInspecionados.a2++;
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        this.totalPorcentagemDepositosInspecionados.b++;
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        this.totalPorcentagemDepositosInspecionados.c++
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        this.totalPorcentagemDepositosInspecionados.d1++;
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        this.totalPorcentagemDepositosInspecionados.d2++;
        contador.columnSix++;
      } else {
        this.totalPorcentagemDepositosInspecionados.e++;
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosZonaNorte = contador;
  }

  mapDocumentosZonaLeste() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosZonaLeste.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        this.totalPorcentagemDepositosInspecionados.a1++;
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        this.totalPorcentagemDepositosInspecionados.a2++;
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        this.totalPorcentagemDepositosInspecionados.c++;
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        this.totalPorcentagemDepositosInspecionados.c++;
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        this.totalPorcentagemDepositosInspecionados.d1++;
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        this.totalPorcentagemDepositosInspecionados.d2++;
        contador.columnSix++;
      } else {
        this.totalPorcentagemDepositosInspecionados.e++;
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosZonaLeste = contador;
  }

  mapDocumentosZonaOeste() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosZonaOeste.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        this.totalPorcentagemDepositosInspecionados.a1++;
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        this.totalPorcentagemDepositosInspecionados.a2++;
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        this.totalPorcentagemDepositosInspecionados.b++;
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        this.totalPorcentagemDepositosInspecionados.c++;
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        this.totalPorcentagemDepositosInspecionados.d1++;
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        this.totalPorcentagemDepositosInspecionados.d2++;
        contador.columnSix++;
      } else {
        this.totalPorcentagemDepositosInspecionados.e++;
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosZonaOeste = contador;
  }

  mapDocumentosCentro() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosCentro.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        this.totalPorcentagemDepositosInspecionados.a1++;
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        this.totalPorcentagemDepositosInspecionados.a2++;
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        this.totalPorcentagemDepositosInspecionados.b++;
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        this.totalPorcentagemDepositosInspecionados.c++;
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        this.totalPorcentagemDepositosInspecionados.d1++;
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        this.totalPorcentagemDepositosInspecionados.d2++;
        contador.columnSix++;
      } else {
        this.totalPorcentagemDepositosInspecionados.e++;
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosCentro = contador;
  }

  mapDocumentosBairro() {
    const contador = {
      columnOne: 0,
      columnTwo: 0,
      columnThree: 0,
      columnFour: 0,
      columnFive: 0,
      columnSix: 0,
      columnSeven: 0,
      total: 0
    };

    this.documentosBairro.forEach(doc => {
      if (doc.tipoDeposito == 'A1') {
        contador.columnOne++;
      } else if (doc.tipoDeposito == 'A2') {
        contador.columnTwo++;
      } else if (doc.tipoDeposito == 'B') {
        contador.columnThree++;
      } else if (doc.tipoDeposito == 'C') {
        contador.columnFour++;
      } else if (doc.tipoDeposito == 'D1') {
        contador.columnFive++;
      } else if (doc.tipoDeposito == 'D2') {
        contador.columnSix++;
      } else {
        contador.columnSeven++;
      }

      contador.total = contador.columnOne + contador.columnTwo + contador.columnThree + contador.columnFour + contador.columnFive + contador.columnSix + contador.columnSeven;
    });

    this.documentosBairro = contador;
  }

  getRegiaoLabel(regiao: string) {
    const regiaoLabel = regiao?.split('_').map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return regiaoLabel.join(' ');
  }

  handleBaixoRiscoOption(relatorios: any) {
    const relatoriosBaixo = relatorios.filter(relatorio => relatorio.riscoTransmissao == 'BAIXO');
    const totalBaixo = relatoriosBaixo.length;
    const totalRegistros = relatorios.length;
    const porcentagemBaixo = (totalBaixo / totalRegistros) * 100;
    const resultado = {
      setores: totalBaixo,
      porcentagem: porcentagemBaixo
    };

    this.baixoRiscoOptions = resultado;
  }

  handleMedioRiscoOption(relatorios: any) {
    const relatoriosMedio = relatorios.filter(relatorio => relatorio.riscoTransmissao == 'MEDIO');
    const totalMedio = relatoriosMedio.length;
    const totalRegistros = relatorios.length;
    const porcentagemMedio = (totalMedio / totalRegistros) * 100;
    const resultado = {
      setores: totalMedio,
      porcentagem: porcentagemMedio
    };

    this.medioRiscoOptions = resultado;
  }

  handleAltoRiscoOption(relatorios: any) {
    const relatoriosAlto = relatorios.filter(relatorio => relatorio.riscoTransmissao == 'ALTO');
    const totalAlto = relatoriosAlto.length;
    const totalRegistros = relatorios.length;
    const porcentagemAlto = (totalAlto / totalRegistros) * 100;
    const resultado = {
      setores: totalAlto,
      porcentagem: porcentagemAlto
    };

    this.altoRiscoOptions = resultado;
  }

  getRiscoTransmissaoLabel(riscoTransmissao: any) {
    if (riscoTransmissao == 'BAIXO') {
      return 'Baixo';
    } else if (riscoTransmissao == 'ALTO') {
      return 'Alto';
    }

    return 'Médio';
  }

  getIndiceInfestacaoLabel(indiceInfestacao: any) {
    if (indiceInfestacao == 'ALERTA') {
      return 'Alerta';
    } else if (indiceInfestacao == 'RISCO') {
      return 'Risco';
    }

    return 'Satisfatório';
  }

  getFormattedNumber(value: any) {
    return Number(value?.toFixed(2));
  }

  isValorNaN(value) {
    return typeof value === 'number' && isNaN(value);
  }

  handleDownload() {
    this.downloading = true;
    html2canvas(this.container.nativeElement, { scale: 4, useCORS: true}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'relatorio-adm-estadual.png';
      link.href = imgData;
      this.downloading = false;
      link.click();
    });
  }
}
