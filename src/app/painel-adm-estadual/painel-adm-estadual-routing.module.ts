import { NgModule } from '@angular/core';
import { PainelAdmEstadualComponent } from './painel-adm-estadual.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: PainelAdmEstadualComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdmEstadualRoutingModule { }
