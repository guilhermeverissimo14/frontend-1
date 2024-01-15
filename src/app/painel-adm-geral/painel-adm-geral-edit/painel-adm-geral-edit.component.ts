import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UsuarioDTO } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-painel-adm-geral-edit',
  templateUrl: './painel-adm-geral-edit.component.html',
  styleUrls: ['./painel-adm-geral-edit.component.css']
})
export class PainelAdmGeralEditComponent extends OnDestroyMixin implements OnInit {

  usuario: UsuarioDTO;

  loading = false;

  constructor(
    protected router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        ({ id }) => this.getUsuarioById(id)
      );
  }

  getUsuarioById(usuarioId: number) {
    this.loading = true;
    this.usuarioService.getById(usuarioId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (usuario) => {
          this.loading = false;
          this.usuario = usuario;
        },
        (e) => {
          this.loading = false;
          if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_GERAL') {
            this.router.navigate(['/painel-adm-geral']);
          } else {
            this.router.navigate(['/usuarios-adm-nacional']);
          }
        }
      );
  }

}
