import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteDTO } from 'src/app/models/Paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-ubs-estadual-edit',
  templateUrl: './ubs-estadual-edit.component.html',
  styleUrls: ['./ubs-estadual-edit.component.css']
})
export class UbsEstadualEditComponent extends OnDestroyMixin implements OnInit {

  paciente: PacienteDTO;

  loading = false;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        ({ id }) => this.getPacienteById(id)
      );
  }

  getPacienteById(pacienteId: number) {
    this.loading = true;
    this.pacienteService.getById(pacienteId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (paciente) => {
          this.loading = false;
          this.paciente = paciente;
        },
        (e) => {
          this.loading = false;
          this.router.navigate(['/ubs-estadual']);
        }
      );
  }

}
