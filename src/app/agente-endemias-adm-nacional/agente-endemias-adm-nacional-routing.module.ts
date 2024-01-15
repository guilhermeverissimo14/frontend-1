import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgenteEndemiasAdmNacionalComponent } from './agente-endemias-adm-nacional.component';
import { AgenteEndemiasAdmNacionalViewComponent } from './agente-endemias-adm-nacional-view/agente-endemias-adm-nacional-view.component';

const routes: Routes = [
    { path: '', component: AgenteEndemiasAdmNacionalComponent },
    { path: 'view/:id', component: AgenteEndemiasAdmNacionalViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenteEndemiasAdmNacionalRoutingModule { }
