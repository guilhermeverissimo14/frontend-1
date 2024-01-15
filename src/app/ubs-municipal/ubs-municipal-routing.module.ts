import { NgModule } from '@angular/core';
import { UbsMunicipalComponent } from './ubs-municipal.component';
import { RouterModule, Routes } from '@angular/router';
import { UbsMunicipalFormComponent } from './ubs-municipal-form/ubs-municipal-form.component';
import { UbsMunicipalViewComponent } from './ubs-municipal-view/ubs-municipal-view.component';
import { PacienteEditComponent } from '../paciente/paciente-edit/paciente-edit.component';

const routes: Routes = [
    { path: '', component: UbsMunicipalComponent },
    { path: 'novo', component: UbsMunicipalFormComponent },
    { path: ':id', component: PacienteEditComponent },
    { path: 'view/:id', component: UbsMunicipalViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbsMunicipalRoutingModule { }
