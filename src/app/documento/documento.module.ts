import { NgModule } from '@angular/core';
import { DocumentoComponent } from './documento.component';
import { DocumentoRoutingModule } from './documento-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentoViewComponent } from './documento-view/documento-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DocumentoComponent, DocumentoViewComponent],
  imports: [
    DocumentoRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [DocumentoComponent]
})
export class DocumentoModule { }
