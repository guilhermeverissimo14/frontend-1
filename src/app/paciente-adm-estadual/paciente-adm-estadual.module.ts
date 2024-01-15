import { NgModule } from '@angular/core';
import { PacienteAdmEstadualListComponent } from './paciente-adm-estadual-list.component';
import { PacienteAdmEstadualRoutingModule } from './paciente-adm-estadual-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PacienteAdmEstadualViewComponent } from './paciente-adm-estadual-view/paciente-adm-estadual-view.component';

@NgModule({
  declarations: [
    PacienteAdmEstadualListComponent,
    PacienteAdmEstadualViewComponent
  ],
  imports: [
    PacienteAdmEstadualRoutingModule,
    SharedModule
  ],
  exports: [PacienteAdmEstadualListComponent]
})
export class PacienteAdmEstadualModule { }
