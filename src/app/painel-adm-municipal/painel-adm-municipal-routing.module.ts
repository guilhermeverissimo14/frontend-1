import { NgModule } from '@angular/core';
import { PainelAdmMunicipalComponent } from './painel-adm-municipal.component';
import { RouterModule, Routes } from '@angular/router';
import { UbsDTO } from '../models/Ubs';


const routes: Routes = [
  { path: '', component: PainelAdmMunicipalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdmMunicipalRoutingModule { }
