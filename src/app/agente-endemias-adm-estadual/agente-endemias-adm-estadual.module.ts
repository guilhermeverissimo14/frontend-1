import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AgenteEndemiasAdmEstadualRoutingModule } from './agente-endemias-adm-estadual-routing.module';
import { AgenteEndemiasAdmEstadualComponent } from './agente-endemias-adm-estadual.component';
import { AgenteEndemiasAdmEstadualViewComponent } from './agente-endemias-adm-estadual-view/agente-endemias-adm-estadual-view.component';

@NgModule({
  declarations: [
    AgenteEndemiasAdmEstadualComponent,
    AgenteEndemiasAdmEstadualViewComponent
  ],
  imports: [
    AgenteEndemiasAdmEstadualRoutingModule,
    SharedModule
  ],
  exports: [AgenteEndemiasAdmEstadualComponent]
})
export class AgenteEndemiasAdmEstadualModule { }
