import { NgModule } from '@angular/core';
import { PainelAdmMunicipalComponent } from './painel-adm-municipal.component';
import { SharedModule } from '../shared/shared.module';
import { PainelAdmMunicipalRoutingModule } from './painel-adm-municipal-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover'
@NgModule({
  declarations: [PainelAdmMunicipalComponent],
  imports: [
    PainelAdmMunicipalRoutingModule,
    NgxChartsModule,
    FormsModule,
    SharedModule,
    NzModalModule,
    NzButtonModule,
    NzPopoverModule
  ],
  exports: [PainelAdmMunicipalComponent]
})
export class PainelAdmMunicipalModule { }
