import { NgModule } from '@angular/core';
import { UbsEstadualComponent } from './ubs-estadual.component';
import { SharedModule } from '../shared/shared.module';
import { UbsEstadualRoutingModule } from './ubs-estadual-routing.module';
import { UbsEstadualFormComponent } from './ubs-estadual-form/ubs-estadual-form.component';
import { UbsEstadualEditComponent } from './ubs-estadual-edit/ubs-estadual-edit.component';
import { UbsEstadualViewComponent } from './ubs-estadual-view/ubs-estadual-view.component';

@NgModule({
  declarations: [
    UbsEstadualComponent,
    UbsEstadualFormComponent,
    UbsEstadualEditComponent,
    UbsEstadualViewComponent,
  ],
  imports: [UbsEstadualRoutingModule, SharedModule],
  exports: [UbsEstadualComponent],
})
export class UbsEstadualModule {}
