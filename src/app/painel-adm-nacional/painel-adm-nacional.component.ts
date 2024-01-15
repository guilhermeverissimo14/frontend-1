import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import html2canvas from 'html2canvas';
import { AuthService } from '../services/auth.service';
import { DocumentoService } from '../services/documento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentoDTO } from '../models/Documento';

declare var google: any;

@Component({
  selector: 'app-painel-adm-nacional',
  templateUrl: './painel-adm-nacional.component.html',
  styleUrls: ['./painel-adm-nacional.component.scss']
})
export class PainelAdmNacionalComponent extends OnDestroyMixin implements OnInit {

  @ViewChild('container') container: ElementRef;
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

  form: FormGroup;

  relatorios: any[] = [];
  documentos: any[] = [];
  baixoRiscoOptions;
  medioRiscoOptions;
  altoRiscoOptions;

  documentosAcre: any[] | any = [];
  documentosAlagoas: any[] | any = [];
  documentosAmapa: any[] | any = [];
  documentosAmazonas: any[] | any = [];
  documentosBahia: any[] | any = [];
  documentosCeara: any[] | any = [];
  documentosDistritoFederal: any[] | any = [];
  documentosEspiritoSanto: any[] | any = [];
  documentosGoias: any[] | any = [];
  documentosMaranhao: any[] | any = [];
  documentosMatoGrosso: any[] | any = [];
  documentosMatoGrossoSul: any[] | any = [];
  documentosMinasGerais: any[] | any = [];
  documentosPara: any[] | any = [];
  documentosParaiba: any[] | any = [];
  documentosParana: any[] | any = [];
  documentosPernambuco: any[] | any = [];
  documentosPiaui: any[] | any = [];
  documentosRioJaneiro: any[] | any = [];
  documentosRioGrandeNorte: any[] | any = [];
  documentosRioGrandeSul: any[] | any = [];
  documentosRondonia: any[] | any = [];
  documentosRoraima: any[] | any = [];
  documentosSantaCatarina: any[] | any = [];
  documentosSaoPaulo: any[] | any = [];
  documentosSergipe: any[] | any = [];
  documentosTocantins: any[] | any = [];

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
    await this.searchDocumentos();
    this.handleGoogleMaps();
  }

  buildForm() {
    this.form = this.fb.group({
      data: []
    });
  }

  handleGoogleMaps() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: 'Brasil' }, (results: any, status: any) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat, lng },
          zoom: 4
        });
      }
    });
  }

  async searchDocumentos() {
    this.loading = true;

    try {
      const documentos = await this.documentoService.listAll().toPromise();
      this.documentos = documentos;
     // this.setDocumentosFromEstados(documentos);
      this.mapForAcre();
      this.mapForAlagoas();
      this.mapForAmapa();
      this.mapForAmazonas();
      this.mapForBahia();
      this.mapForCeara();
      this.mapForDistritoFederal();
      this.mapForEspiritoSanto();
      this.mapForGoias();
      this.mapForMaranhao();
      this.mapForMatoGrosso();
      this.mapForMatoGrossoSul();
      this.mapForMinasGerais();
      this.mapForPara();
      this.mapForParaiba();
      this.mapForParana();
      this.mapForPernambuco();
      this.mapForPiaui();
      this.mapForRioJaneiro();
      this.mapForRioGrandeNorte();
      this.mapForRioGrandeSul();
      this.mapForRondonia();
      this.mapForRoraima();
      this.mapForSantaCatarina();
      this.mapForSaoPaulo();
      this.mapForSergipe();
      this.mapForTocantins();

      this.totalPorcentagemDepositosInspecionados.total =
        this.documentosAcre.total +
        this.documentosAlagoas.total +
        this.documentosAmapa.total +
        this.documentosAmazonas.total +
        this.documentosBahia.total +
        this.documentosCeara.total +
        this.documentosDistritoFederal.total +
        this.documentosEspiritoSanto.total +
        this.documentosGoias.total +
        this.documentosMaranhao.total +
        this.documentosMatoGrosso.total +
        this.documentosMatoGrossoSul.total +
        this.documentosMinasGerais.total +
        this.documentosPara.total +
        this.documentosParaiba.total +
        this.documentosParana.total +
        this.documentosPernambuco.total +
        this.documentosPiaui.total +
        this.documentosRioJaneiro.total +
        this.documentosRioGrandeNorte.total +
        this.documentosRioGrandeSul.total +
        this.documentosRondonia.total +
        this.documentosRoraima.total +
        this.documentosSantaCatarina.total +
        this.documentosSaoPaulo.total +
        this.documentosSergipe.total +
        this.documentosTocantins.total;


        console.log(this.totalPorcentagemDepositosInspecionados);

      for (const documento of this.documentos) {
        const index = this.single.findIndex(item => item.name === documento.tipoDeposito);
        if (index !== -1) {
          this.single[index].value++;
        }
      }

      this.graphVisible = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

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

  // setDocumentosFromEstados(documentos: DocumentoDTO[]) {
  //   this.documentosAcre = documentos.filter(d => d.usuario.estado == 'AC');
  //   this.documentosAlagoas = documentos.filter(d => d.usuario.estado == 'AL');
  //   this.documentosAmapa = documentos.filter(d => d.usuario.estado == 'AP');
  //   this.documentosAmazonas = documentos.filter(d => d.usuario.estado == 'AM');
  //   this.documentosBahia = documentos.filter(d => d.usuario.estado == 'BA');
  //   this.documentosCeara = documentos.filter(d => d.usuario.estado == 'CE');
  //   this.documentosDistritoFederal = documentos.filter(d => d.usuario.estado == 'DF');
  //   this.documentosEspiritoSanto = documentos.filter(d => d.usuario.estado == 'ES');
  //   this.documentosGoias = documentos.filter(d => d.usuario.estado == 'GO');
  //   this.documentosMaranhao = documentos.filter(d => d.usuario.estado == 'MA');
  //   this.documentosMatoGrosso = documentos.filter(d => d.usuario.estado == 'MT');
  //   this.documentosMatoGrossoSul = documentos.filter(d => d.usuario.estado == 'MS');
  //   this.documentosMinasGerais = documentos.filter(d => d.usuario.estado == 'MG');
  //   this.documentosPara = documentos.filter(d => d.usuario.estado == 'PA');
  //   this.documentosParaiba = documentos.filter(d => d.usuario.estado == 'PB');
  //   this.documentosParana = documentos.filter(d => d.usuario.estado == 'PR');
  //   this.documentosPernambuco = documentos.filter(d => d.usuario.estado == 'PE');
  //   this.documentosPiaui = documentos.filter(d => d.usuario.estado == 'PI');
  //   this.documentosRioJaneiro = documentos.filter(d => d.usuario.estado == 'RJ');
  //   this.documentosRioGrandeNorte = documentos.filter(d => d.usuario.estado == 'RN');
  //   this.documentosRioGrandeSul = documentos.filter(d => d.usuario.estado == 'RS');
  //   this.documentosRondonia = documentos.filter(d => d.usuario.estado == 'RO');
  //   this.documentosRoraima = documentos.filter(d => d.usuario.estado == 'RR');
  //   this.documentosSantaCatarina = documentos.filter(d => d.usuario.estado == 'SC');
  //   this.documentosSaoPaulo = documentos.filter(d => d.usuario.estado == 'SP');
  //   this.documentosSergipe = documentos.filter(d => d.usuario.estado == 'SE');
  //   this.documentosTocantins = documentos.filter(d => d.usuario.estado == 'TO');
  // }

  mapForAcre() {
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

    this.documentosAcre.forEach(doc => {
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

    this.documentosAcre = contador;
  }

  mapForAlagoas() {
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

    this.documentosAlagoas.forEach(doc => {
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

    this.documentosAlagoas = contador;
  }

  mapForAmapa() {
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

    this.documentosAmapa.forEach(doc => {
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

    this.documentosAmapa = contador;
  }

  mapForAmazonas() {
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

    this.documentosAmazonas.forEach(doc => {
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

    this.documentosAmazonas = contador;
  }

  mapForBahia() {
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

    this.documentosBahia.forEach(doc => {
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

    this.documentosBahia = contador;
  }

  mapForCeara() {
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

    this.documentosCeara.forEach(doc => {
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

    this.documentosCeara = contador;
  }

  mapForDistritoFederal() {
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

    this.documentosDistritoFederal.forEach(doc => {
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

    this.documentosDistritoFederal = contador;
  }

  mapForEspiritoSanto() {
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

    this.documentosEspiritoSanto.forEach(doc => {
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

    this.documentosEspiritoSanto = contador;
  }

  mapForGoias() {
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

    this.documentosGoias.forEach(doc => {
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

    this.documentosGoias = contador;
  }

  mapForMaranhao() {
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

    this.documentosMaranhao.forEach(doc => {
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

    this.documentosMaranhao = contador;
  }

  mapForMatoGrosso() {
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

    this.documentosMatoGrosso.forEach(doc => {
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

    this.documentosMatoGrosso = contador;
  }

  mapForMatoGrossoSul() {
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

    this.documentosMatoGrossoSul.forEach(doc => {
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

    this.documentosMatoGrossoSul = contador;
  }

  mapForMinasGerais() {
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

    this.documentosMinasGerais.forEach(doc => {
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

    this.documentosMinasGerais = contador;
  }

  mapForPara() {
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

    this.documentosPara.forEach(doc => {
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

    this.documentosPara = contador;
  }

  mapForParaiba() {
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

    this.documentosParaiba.forEach(doc => {
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

    this.documentosParaiba = contador;

  }

  mapForParana() {
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

    this.documentosParana.forEach(doc => {
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

    this.documentosParana = contador;
  }

  mapForPernambuco() {
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

    this.documentosPernambuco.forEach(doc => {
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

    this.documentosPernambuco = contador;
  }

  mapForPiaui() {
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

    this.documentosPiaui.forEach(doc => {
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

    this.documentosPiaui = contador;
  }

  mapForRioJaneiro() {
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

    this.documentosRioJaneiro.forEach(doc => {
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

    this.documentosRioJaneiro = contador;
  }

  mapForRioGrandeNorte() {
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

    this.documentosRioGrandeNorte.forEach(doc => {
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

    this.documentosRioGrandeNorte = contador;
  }

  mapForRioGrandeSul() {
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

    this.documentosRioGrandeSul.forEach(doc => {
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

    this.documentosRioGrandeSul = contador;
  }

  mapForRondonia() {
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

    this.documentosRondonia.forEach(doc => {
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

    this.documentosRondonia = contador;
  }

  mapForRoraima() {
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

    this.documentosRoraima.forEach(doc => {
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

    this.documentosRoraima = contador;
  }

  mapForSantaCatarina() {
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

    this.documentosSantaCatarina.forEach(doc => {
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

    this.documentosSantaCatarina = contador;
  }

  mapForSaoPaulo() {
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

    this.documentosSaoPaulo.forEach(doc => {
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

    this.documentosSaoPaulo = contador;
  }

  mapForSergipe() {
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

    this.documentosSergipe.forEach(doc => {
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

    this.documentosSergipe = contador;
  }

  mapForTocantins() {
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

    this.documentosTocantins.forEach(doc => {
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

    this.documentosTocantins = contador;
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
      link.download = 'relatorio-adm-nacional.png';
      link.href = imgData;
      this.downloading = false;
      link.click();
    });
  }

}
