import { NgModule } from '@angular/core';
import { PacienteListComponent } from './paciente-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';
import { PacienteViewComponent } from './paciente-view/paciente-view.component';

const routes: Routes = [
    { path: '', component: PacienteListComponent },
    { path: 'novo', component: PacienteCreateComponent },
    { path: ':id', component: PacienteEditComponent },
    { path: 'view/:id', component: PacienteViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
