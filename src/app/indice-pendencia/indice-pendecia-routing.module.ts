import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicePendenciaComponent } from './indice-pendencia.component';

const routes: Routes = [
    { path: '', component: IndicePendenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicePendenciaRoutingModule { }
