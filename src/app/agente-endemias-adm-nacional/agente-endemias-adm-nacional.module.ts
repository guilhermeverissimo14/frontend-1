import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AgenteEndemiasAdmNacionalRoutingModule } from './agente-endemias-adm-nacional-routing.module';
import { AgenteEndemiasAdmNacionalComponent } from './agente-endemias-adm-nacional.component';
import { AgenteEndemiasAdmNacionalViewComponent } from './agente-endemias-adm-nacional-view/agente-endemias-adm-nacional-view.component';

@NgModule({
  declarations: [
    AgenteEndemiasAdmNacionalComponent,
    AgenteEndemiasAdmNacionalViewComponent
  ],
  imports: [
    AgenteEndemiasAdmNacionalRoutingModule,
    SharedModule
  ],
  exports: [AgenteEndemiasAdmNacionalComponent]
})
export class AgenteEndemiasAdmNacionalModule { }
