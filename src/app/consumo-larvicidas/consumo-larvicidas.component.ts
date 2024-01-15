import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DocumentoDTO } from '../models/Documento';
import { DocumentoService } from '../services/documento.service';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDTO } from '../models/Usuario';

@Component({
  selector: 'app-consumo-larvicidas',
  templateUrl: './consumo-larvicidas.component.html',
  styleUrls: ['./consumo-larvicidas.component.css']
})
export class ConsumoLarvicidasComponent implements OnInit {

  usuarios: UsuarioDTO[] = [];
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
  anoSelecionado: number;

  constructor(
    private usuarioService:UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const mesAtual = new Date().getMonth() + 1;
    this.mesSelecionado = mesAtual;
    const anoAtual = new Date().getFullYear();
    this.anoSelecionado = anoAtual;
    this.listConsumo();
  }

  listConsumo() {
    const cidade = this.authService.authenticatedUser.cidade;

    this.usuarioService.getByConsumo(this.mesSelecionado, this.anoSelecionado, cidade)
      .subscribe(
        (consumos: UsuarioDTO[]) => {
          this.usuarios = consumos;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Erro ao obter dados de consumo';
          this.loading = false;
        }
      );
  }

}
