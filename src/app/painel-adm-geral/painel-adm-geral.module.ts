import { NgModule } from '@angular/core';
import { PainelAdmGeralRoutingModule } from './painel-adm-geral-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PainelAdmGeralListComponent } from './painel-adm-geral-list.component';
import { PainelAdmGeralFormComponent } from './painel-adm-geral-form/painel-adm-geral-form.component';
import { PainelAdmGeralCreateComponent } from './painel-adm-geral-create/painel-adm-geral-create.component';
import { PainelAdmGeralEditComponent } from './painel-adm-geral-edit/painel-adm-geral-edit.component';

@NgModule({
  declarations: [
    PainelAdmGeralListComponent,
    PainelAdmGeralFormComponent,
    PainelAdmGeralCreateComponent,
    PainelAdmGeralEditComponent
  ],
  imports: [
    PainelAdmGeralRoutingModule,
    SharedModule
  ],
  exports: [PainelAdmGeralListComponent]
})
export class PainelAdmGeralModule { }
