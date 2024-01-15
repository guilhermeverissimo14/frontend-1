import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgenteEndemiasAdmEstadualComponent } from './agente-endemias-adm-estadual.component';
import { AgenteEndemiasAdmEstadualViewComponent } from './agente-endemias-adm-estadual-view/agente-endemias-adm-estadual-view.component';

const routes: Routes = [
    { path: '', component: AgenteEndemiasAdmEstadualComponent },
    { path: 'view/:id', component: AgenteEndemiasAdmEstadualViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenteEndemiasAdmEstadualRoutingModule { }
