import { NgModule } from '@angular/core';
import { PainelAdmEstadualComponent } from './painel-adm-estadual.component';
import { SharedModule } from '../shared/shared.module';
import { PainelAdmEstadualRoutingModule } from './painel-adm-estadual-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [PainelAdmEstadualComponent],
  imports: [
    PainelAdmEstadualRoutingModule,
    NgxChartsModule,
    SharedModule
  ],
  exports: [PainelAdmEstadualComponent]
})
export class PainelAdmEstadualModule { }
