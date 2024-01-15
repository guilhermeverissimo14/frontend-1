import { NgModule } from '@angular/core';
import { DocumentoAdmEstadualComponent } from './documento-adm-estadual.component';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoAdmEstadualViewComponent } from './documento-adm-estadual-view/documento-adm-estadual-view.component';

const routes: Routes = [
    { path: '', component: DocumentoAdmEstadualComponent },
    { path: 'view/:id', component: DocumentoAdmEstadualViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoAdmEstadualRoutingModule { }
