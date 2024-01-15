import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoAdmEstadualFilterParams, DocumentoDTO } from '../models/Documento';
import { AuthService } from '../services/auth.service';
import { DocumentoService } from '../services/documento.service';
import { Cidade, cidades } from '../shared/utils/cidades';
import { estados } from '../shared/utils/estados';


@Component({
  selector: 'app-documento-adm-estadual',
  templateUrl: './documento-adm-estadual.component.html',
  styleUrls: ['./documento-adm-estadual.component.css']
})
export class DocumentoAdmEstadualComponent extends OnDestroyMixin implements OnInit {

  documentos: DocumentoDTO[] = [];
  formFilter: FormGroup;
  filterForm: FormGroup;

  cidadeOptions = [];
  estados = estados;
  estado = "";

  loading = false;

  constructor(
    private documentoService: DocumentoService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildFormFilter();
    this.buildFilterForm();
    this.setFilterAdmEstadual();
    this.listByFilter();
    if (this.formFilter.value.estado == null) {
      this.addCidadesOptions();
    } else {
      this.listCidadeByEstado()
    }
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      nomeProprietario: [null]
    });
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      cidade: [null],
      estado: [null]
    });
  }

  setFilterAdmEstadual() {
    if (this.authService.authenticatedUser.tipoUsuario == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.formFilter.value.estado = this.authService.authenticatedUser.estado
    }
  }

  addCidadesOptions() {
    cidades.forEach((cidade) => {
      const cidadeObject = new Cidade(cidade.cidade)
      this.cidadeOptions.push(cidadeObject);
    });

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  listCidadeByEstado() {
    this.cidadeOptions = [];
    cidades.forEach((cidade) => {
      if (cidade.estado == this.formFilter.value.estado || this.formFilter.value.estado == null) {
        const cidadeObject = new Cidade(cidade.cidade)
        this.cidadeOptions.push(cidadeObject);
      }
    })

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  listByFilter() {
    const filterParams: DocumentoAdmEstadualFilterParams = {
      nomeProprietario: this.formFilter.value.nomeProprietario,
      estado: this.authService.authenticatedUser.estado,
      cidade: this.filterForm.value.cidade
    };

    if (this.currentUserRole == 'ROLE_ADMINISTRADOR_NACIONAL') {
        filterParams.estado = this.filterForm.value.estado
    }

    this.loading = true;
    this.documentoService.listByAdmEstadualFilter(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (documentos) => {
          this.documentos = documentos;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  get currentUserRole() {
    return this.authService.authenticatedUser.tipoUsuario;
  }

  handleView(documento: DocumentoDTO) {
    if (this.currentUserRole == 'ROLE_ADMINISTRADOR_ESTADUAL') {
      this.router.navigate(['documentos-adm-estadual', 'view', documento.id]);
    } else {
      this.router.navigate(['documentos-adm-nacional', 'view', documento.id]);
    }
  }

}
