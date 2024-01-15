import { NgModule } from '@angular/core';
import { AgenteEndemiaComponent } from './agente-endemia.component';
import { Routes, RouterModule } from '@angular/router';
import { AgenteEndemiaViewComponent } from './agente-endemia-view/agente-endemia-view.component';

const routes: Routes = [
    { path: '', component: AgenteEndemiaComponent },
    { path: 'view/:id', component: AgenteEndemiaViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenteEndemiaRoutingModule { }
