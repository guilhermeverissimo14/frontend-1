import { NgModule } from '@angular/core';
import { PainelAdmNacionalComponent } from './painel-adm-nacional.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: PainelAdmNacionalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdmNacionalRoutingModule { }
