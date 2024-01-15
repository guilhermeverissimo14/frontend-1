import { NgModule } from '@angular/core';
import { AgenteEndemiaComponent } from './agente-endemia.component';
import { AgenteEndemiaRoutingModule } from './agente-endemia-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgenteEndemiaViewComponent } from './agente-endemia-view/agente-endemia-view.component';

@NgModule({
  declarations: [
    AgenteEndemiaComponent,
    AgenteEndemiaViewComponent
  ],
  imports: [
    AgenteEndemiaRoutingModule,
    SharedModule
  ],
  exports: [AgenteEndemiaComponent]
})
export class AgenteEndemiaModule { }
