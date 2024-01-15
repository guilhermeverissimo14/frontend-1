import { NgModule } from '@angular/core';
import { DocumentoAdmEstadualComponent } from './documento-adm-estadual.component';
import { DocumentoAdmEstadualRoutingModule } from './documento-adm-estadual-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentoAdmEstadualViewComponent } from './documento-adm-estadual-view/documento-adm-estadual-view.component';

@NgModule({
  declarations: [DocumentoAdmEstadualComponent, DocumentoAdmEstadualViewComponent],
  imports: [
    DocumentoAdmEstadualRoutingModule,
    SharedModule
  ],
  exports: [DocumentoAdmEstadualComponent]
})
export class DocumentoAdmEstadualModule { }
