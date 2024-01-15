import { Component, OnInit } from '@angular/core';
import { IndicePendenciaService } from '../services/indice-pendencia.service';
import { IndicePendencia } from '../models/IndicePendencia';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-indice-pendencia',
  templateUrl: './indice-pendencia.component.html',
  styleUrls: ['./indice-pendencia.component.css']
})
export class IndicePendenciaComponent implements OnInit {

  pendencias: IndicePendencia[] = [];
  loading = true;
  errorMessage: string | null = null;
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

  constructor(
    private indicePendenciaService: IndicePendenciaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listPendencias();
    const mesAtual = new Date().getMonth() + 1;
    this.mesSelecionado = mesAtual;
    const anoAtual = new Date().getFullYear();
    this.anoSelecionado = anoAtual;
    this.listPendencias();
  }


  listPendencias() {
    const cidade = this.authService.authenticatedUser.cidade;

    this.indicePendenciaService.listIndicePendencia(this.mesSelecionado, this.anoSelecionado, cidade).subscribe(
      (data) => {
        this.pendencias = data.map(pendencia => ({
          ...pendencia,
          porcentagemPendencia: this.calcularPorcentagemPendencia(pendencia.vistoriaPendente, pendencia.vistoriaAFazer)
        }));
        console.log(this.pendencias);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao listar pendências. Tente novamente mais tarde.';
        console.error(error);
        this.loading = false;
      }
    );
  }

  calcularPorcentagemPendencia(vistoriaPendente: number, vistoriaAFazer: number): number {
    if (vistoriaAFazer === 0) {
      return 0;
    }

    return (vistoriaPendente / vistoriaAFazer) * 100;
  }

}
