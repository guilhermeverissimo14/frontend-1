import { NgModule } from '@angular/core';
import { TermoUsoComponent } from './termo-uso.component';
import { SharedModule } from '../shared/shared.module';
import { TermoUsoRoutingModule } from './termo-uso-routing.module';

@NgModule({
  declarations: [TermoUsoComponent],
  imports: [
    TermoUsoRoutingModule,
    SharedModule
  ],
  exports: [TermoUsoComponent]
})
export class TermoUsoModule { }
