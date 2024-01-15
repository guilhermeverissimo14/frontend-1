import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { DocumentoAdmMunicipalFilterParams, DocumentoDTO, DocumentoFilterParams } from '../models/Documento';
import { AuthService } from '../services/auth.service';
import { DocumentoService } from '../services/documento.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DocumentPage } from '../models/document-page';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent extends OnDestroyMixin implements OnInit {
  documents$: Observable<DocumentPage> | null = null;
  documentos: DocumentoDTO[] = [];
  formFilter: FormGroup;

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
  page: DocumentPage;

  loading = false;

  constructor(
    private documentoService: DocumentoService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {

    const mesAtual = new Date().getMonth() + 1;
    this.mesSelecionado = mesAtual;
    const anoAtual = new Date().getFullYear();
    this.anoSelecionado = anoAtual;
    this.list();
    this.buildFormFilter();
  }

  buildFormFilter() {
    this.formFilter = this.fb.group({
      nomeProprietario: [null]
    });
  }

  list(pageNumber: number = 0, pageSize: number = 10) {
    const cidade = this.authService.authenticatedUser.cidade;

    this.documents$ = this.documentoService.listAllPaged(this.mesSelecionado, this.anoSelecionado, cidade, pageNumber, pageSize)
    .pipe(
      tap((page: DocumentPage) => {
        this.page = page;
        this.documentos = page.documents;
      }),
      catchError(() => {
        console.log('erro');
        return of({ documents: [], totalElements: 0 } as DocumentPage);
      })
    );
}

  onPageIndexChange(pageNumber: number): void {
    this.list(pageNumber, this.page?.totalElements);
  }

  onPageSizeChange(pageSize: number): void {
    this.list(1, pageSize);
  }

  listByFilter() {
    const filterParams: DocumentoAdmMunicipalFilterParams = {
      nomeProprietario: this.formFilter.value.nomeProprietario,
      estado: this.authService.authenticatedUser.estado,
      cidade: this.authService.authenticatedUser.cidade
    };

    this.loading = true;
    this.documentoService.listByAdmMunicipalFilter(filterParams)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (documentos) => {
          console.log("qual documento?", documentos)
          this.documentos = documentos;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  handleView(documento: DocumentoDTO) {
    this.router.navigate(['documentos', 'view', documento.id]);
  }

  deleteDocument(documento: DocumentoDTO) {
    const confirm = window.confirm('Tem certeza que deseja apagar esse documento?');
    if(confirm){
      this.documentoService.deleteById(documento)
        .subscribe(() => {
          this.messageService.success('Documento excluido com sucesso!');
          this.listByFilter();
        }, error => {
          console.error(error);
        });
    }
  }
}
