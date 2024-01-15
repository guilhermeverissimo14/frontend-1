import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { PacienteDTO } from 'src/app/models/Paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paciente-adm-estadual-view',
  templateUrl: './paciente-adm-estadual-view.component.html',
  styleUrls: ['./paciente-adm-estadual-view.component.css']
})
export class PacienteAdmEstadualViewComponent extends OnDestroyMixin implements OnInit {

  paciente: PacienteDTO;

  @ViewChild('container') container: ElementRef;

  downloading = false;
  loading = false;

  constructor(
    protected router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private location: Location
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
          if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
            this.router.navigate(['/pacientes-adm-estadual']);
          } else {
            this.router.navigate(['/pacientes-adm-nacional']);
          }
        }
      );
  }

  getAnalisePaciente(analisePaciente: any) {
    if (analisePaciente == 'EM_ANALISE') {
      return 'Em Análise';
    } else if (analisePaciente == 'POSITIVO') {
      return 'Positivo';
    }

    return 'Negativo';
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

}
