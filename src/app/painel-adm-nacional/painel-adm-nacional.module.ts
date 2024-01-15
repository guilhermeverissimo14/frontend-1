import { NgModule } from '@angular/core';
import { PainelAdmNacionalComponent } from './painel-adm-nacional.component';
import { SharedModule } from '../shared/shared.module';
import { PainelAdmNacionalRoutingModule } from './painel-adm-nacional-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [PainelAdmNacionalComponent],
  imports: [
    PainelAdmNacionalRoutingModule,
    NgxChartsModule,
    SharedModule
  ],
  exports: [PainelAdmNacionalComponent]
})
export class PainelAdmNacionalModule { }
