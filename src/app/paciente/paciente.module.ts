import { NgModule } from '@angular/core';
import { PacienteListComponent } from './paciente-list.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';
import { PacienteViewComponent } from './paciente-view/paciente-view.component';

@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteFormComponent,
    PacienteCreateComponent,
    PacienteEditComponent,
    PacienteViewComponent
  ],
  imports: [
    PacienteRoutingModule,
    SharedModule
  ],
  exports: [PacienteListComponent]
})
export class PacienteModule { }
