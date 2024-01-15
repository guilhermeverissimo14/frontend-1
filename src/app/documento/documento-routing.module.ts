import { NgModule } from '@angular/core';
import { DocumentoComponent } from './documento.component';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoViewComponent } from './documento-view/documento-view.component';

const routes: Routes = [
    { path: '', component: DocumentoComponent },
    { path: 'view/:id', component: DocumentoViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoRoutingModule { }
