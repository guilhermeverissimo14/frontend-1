import { NgModule } from '@angular/core';
import { PacienteAdmEstadualListComponent } from './paciente-adm-estadual-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PacienteAdmEstadualViewComponent } from './paciente-adm-estadual-view/paciente-adm-estadual-view.component';

const routes: Routes = [
    { path: '', component: PacienteAdmEstadualListComponent },
    { path: 'view/:id', component: PacienteAdmEstadualViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteAdmEstadualRoutingModule { }
