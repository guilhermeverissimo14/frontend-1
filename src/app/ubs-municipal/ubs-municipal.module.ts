import { NgModule } from '@angular/core';
import { UbsMunicipalComponent } from './ubs-municipal.component';
import { SharedModule } from '../shared/shared.module';
import { UbsMunicipalRoutingModule } from './ubs-municipal-routing.module';
import { UbsMunicipalFormComponent } from './ubs-municipal-form/ubs-municipal-form.component';
import { UbsMunicipalEditComponent } from './ubs-municipal-edit/ubs-municipal-edit.component';
import { UbsMunicipalViewComponent } from './ubs-municipal-view/ubs-municipal-view.component';
import { CondicionalPipe } from '../shared/pipes/condicional.pipe';

@NgModule({
  declarations: [
    UbsMunicipalComponent,
    UbsMunicipalFormComponent,
    UbsMunicipalEditComponent,
    UbsMunicipalViewComponent,
    CondicionalPipe
  ],
  imports: [UbsMunicipalRoutingModule, SharedModule],
  exports: [UbsMunicipalComponent],
})
export class UbsMunicipalModule {}
