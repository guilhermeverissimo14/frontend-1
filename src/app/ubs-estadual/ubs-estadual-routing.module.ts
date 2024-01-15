import { NgModule } from '@angular/core';
import { UbsEstadualComponent } from './ubs-estadual.component';
import { RouterModule, Routes } from '@angular/router';
import { UbsEstadualFormComponent } from './ubs-estadual-form/ubs-estadual-form.component';
import { UbsEstadualViewComponent } from './ubs-estadual-view/ubs-estadual-view.component';
import { PacienteEditComponent } from '../paciente/paciente-edit/paciente-edit.component';

const routes: Routes = [
    { path: '', component: UbsEstadualComponent },
    { path: 'novo', component: UbsEstadualFormComponent },
    { path: ':id', component: PacienteEditComponent },
    { path: 'view/:id', component: UbsEstadualViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbsEstadualRoutingModule { }
