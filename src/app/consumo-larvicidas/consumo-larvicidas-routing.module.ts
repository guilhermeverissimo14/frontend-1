import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumoLarvicidasComponent } from './consumo-larvicidas.component';

const routes: Routes = [
    { path: '', component: ConsumoLarvicidasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumoLarvicidasRoutingModule { }
