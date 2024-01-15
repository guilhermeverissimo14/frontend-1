import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UsuarioDTO } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { estados } from 'src/app/shared/utils/estados';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent extends OnDestroyMixin implements OnInit {

  usuario: UsuarioDTO;

  loading = false;

  estado = ""

  constructor(
    protected router: Router,
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

  async getUsuarioById(usuarioId: number) {
    this.loading = true;
    await this.usuarioService.getById(usuarioId).toPromise()
    .then((usuario) => {
      this.loading = false;
      this.usuario = usuario;
    })
    .catch((e) => {
      this.loading = false;
      this.router.navigate(['/usuario']);
    })

    this.getEstadoBySigla()
  }

  getEstadoBySigla() {
    const estadoSigla = this.usuario.estado;
    const estadoNome = estados[estados.findIndex((element) => element.value == estadoSigla)].label;
    this.usuario.estado = estadoNome;
  }

}
