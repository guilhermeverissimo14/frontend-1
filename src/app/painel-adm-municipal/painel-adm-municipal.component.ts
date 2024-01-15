import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../services/auth.service';
import html2canvas from 'html2canvas';
import { TipoDeposito } from './tipo-deposito.enum';
import { DataService } from '../services/data.service';
import { Indice } from '../models/indice';
import { DadoPaciente } from '../models/dado-paciente';
import { AnalisePaciente } from '../models/analise-paciente.enum';
import { PacienteDTO, PacienteUbsFilterParams } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';
import { UbsDTO } from '../models/Ubs';
import { ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-painel-adm-municipal',
  templateUrl: './painel-adm-municipal.component.html',
  styleUrls: ['./painel-adm-municipal.component.scss']
})
export class PainelAdmMunicipalComponent extends OnDestroyMixin implements OnInit {

  @ViewChild('container') container: ElementRef;
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

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
  pacientes: PacienteDTO[] = [];
  dadosPacientes: DadoPaciente[] = [];
  indiceDocumentos: Indice[] = [];
  ubsId: number;
  ubs: UbsDTO;
  categoriasDeposits = Object.values(TipoDeposito);
  isUltimaLinha: boolean = false;

  lat = -23.310546;
  lng = -51.169392;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Tipo de Depósito';
  yAxisLabel = 'Quantidade';

  downloading = false;
  graphVisible = false;
  loading = false;

  totalA1: number = 0;
  totalA2: number = 0;
  totalB: number = 0;
  totalC: number = 0;
  totalD1: number = 0;
  totalD2: number = 0;
  totalE: number = 0;
  totalOutroTpDeposito: number = 0;
  totalTspl: number = 0;
  totalTisa: number = 0;
  totalTvz: number = 0;
  totalTcpl: number = 0;
  totalTerrenoBaldio: number = 0;
  totalOutrTpImovel: number = 0;
  totalIfp: number = 0;
  risco: string;
  totalNotificados: number;
  totalSomaCasosPositivos: number;
  totalSomaCasosEstrangeiros: number;
  totalSomaCasosSuspeitos: number;
  totalInternados: number;
  totalSomaObitos: number;
  totalSomaObitosSuspeitos: number;
  totalUbsId: number;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    const mesAtual = new Date().getMonth() + 1;
    this.mesSelecionado = mesAtual;
    const anoAtual = new Date().getFullYear();
    this.anoSelecionado = anoAtual;
    this.handleGoogleMaps();

    this.route.params.subscribe(params => {
      this.ubsId = params['id'] || null;
      this.refreshPatient();
    });
    this.refreshDocument();
  }

  refreshDocument() {
    const cidade = this.authService.authenticatedUser.cidade;

    this.dataService.filterDocument(this.mesSelecionado, this.anoSelecionado, cidade).subscribe(
      (data) => {
        this.indiceDocumentos = data || [];
        this.calculateTotals();

      },
      (error) => {
        console.error('Erro ao obter dados', error);
      }
    );
  }

  calculateTotals() {
    this.totalA1 = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdA1, 0);
    this.totalA2 = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdA2, 0);
    this.totalB = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdB, 0);
    this.totalC = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdC, 0);
    this.totalD1 = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdD1, 0);
    this.totalD2 = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdD2, 0);
    this.totalE = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdE, 0);
    this.totalOutroTpDeposito = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdOutroTpDeposito, 0);
    this.totalTspl = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdTspl, 0);
    this.totalTisa = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdTisa, 0);
    this.totalTvz = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdTvz, 0);
    this.totalTcpl = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdTcpl, 0);
    this.totalTerrenoBaldio = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdTerrenoBaldio, 0);
    this.totalOutrTpImovel = this.indiceDocumentos.reduce((sum, dado) => sum + dado.qtdOutrTpImovel, 0);
    this.totalIfp = this.indiceDocumentos.reduce((sum, dado) => sum + dado.ifp, 0);
    this.totalNotificados = this.dadosPacientes.reduce((sum, dado) => sum + dado.notificados, 0);
    this.totalSomaCasosPositivos = this.dadosPacientes.reduce((sum, dado) => sum + dado.somaCasosPositivos, 0);
    this.totalSomaCasosEstrangeiros = this.dadosPacientes.reduce((sum, dado) => sum + dado.somaCasosEstrangeiros, 0);
    this.totalSomaCasosSuspeitos = this.dadosPacientes.reduce((sum, dado) => sum + dado.somaCasosSuspeitos, 0);
    this.totalInternados = this.dadosPacientes.reduce((sum, dado) => sum + dado.internados, 0);
    this.totalSomaObitos = this.dadosPacientes.reduce((sum, dado) => sum + dado.somaObitos, 0);
    this.totalSomaObitosSuspeitos = this.dadosPacientes.reduce((sum, dado) => sum + dado.somaObitosSuspeitos, 0);
    this.totalUbsId = this.dadosPacientes.reduce((sum, dado) => sum + dado.ubsId, 0);
  }

  refreshPatient() {
    const cidade = this.authService.authenticatedUser.cidade;
    this.dataService.filterPatient(this.ubsId, this.mesSelecionado, this.anoSelecionado, cidade).subscribe(
      (data) => {
        console.log('o que tá chegando:', data);
        this.dadosPacientes = data;
        console.log('o que tá chegando2:', this.dadosPacientes);
      },
      (error) => {
        console.error('Erro ao obter dados', error);
      }
    );
  }

  getIfpColorClass(ifpValue: number): string {
    if (ifpValue < 30) {
      return 'baixo-risco';
    } else if (ifpValue < 70) {
      return 'medio-risco';
    } else {
      return 'alto-risco';
    }
  }

  getPatientColorClass(positivePercentage: number): string {
    if (positivePercentage < 30) {
      return 'baixo-risco';
    } else if (positivePercentage < 70) {
      return 'medio-risco';
    } else {
      return 'alto-risco';
    }
  }


  handleGoogleMaps() {
    const geocoder = new google.maps.Geocoder();
    const currentCidade = this.authService.authenticatedUser.cidade;
    geocoder.geocode({ address: currentCidade }, (results: any, status: any) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat, lng },
          zoom: 13
        });
      }
    });
  }

  disabledDate = (current: Date): boolean => {
    return current.getTime() > Date.now();
  };


  getRegiaoLabel(regiao: string) {
    if (!regiao) {
      return 'N/A';
    }

    const regiaoLabel = regiao.split('_').map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return regiaoLabel.join(' ');
  }


  getFormattedNumber(value: any) {
    return Number(value?.toFixed(2));
  }

  isValorNaN(value: number) {
    return typeof value === 'number' && isNaN(value);
  }

  handleDownload() {
    this.downloading = true;
    html2canvas(this.container.nativeElement, { scale: 4, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'relatorio-adm-municipal.png';
      link.href = imgData;
      this.downloading = false;
      link.click();
    });
  }

}
