import { NgModule } from '@angular/core';
import { ProfissionalUbsListComponent } from './profissional-ubs-list.component';
import { ProfissionalUbsRoutingModule } from './profissional-ubs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfissionalUbsFormComponent } from './profissional-ubs-form/profissional-ubs-form.component';
import { ProfissionalUbsCreateComponent } from './profissional-ubs-create/profissional-ubs-create.component';
import { ProfissionalUbsEditComponent } from './profissional-ubs-edit/profissional-ubs-edit.component';
import { ProfissionalUbsViewComponent } from './profissional-ubs-view/profissional-ubs-view.component';

@NgModule({
  declarations: [
    ProfissionalUbsListComponent,
    ProfissionalUbsFormComponent,
    ProfissionalUbsCreateComponent,
    ProfissionalUbsEditComponent,
    ProfissionalUbsViewComponent
  ],
  imports: [
    ProfissionalUbsRoutingModule,
    SharedModule
  ],
  exports: [ProfissionalUbsListComponent]
})
export class ProfissionalUbsModule { }
