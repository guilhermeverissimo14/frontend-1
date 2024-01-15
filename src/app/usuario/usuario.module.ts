import { NgModule } from '@angular/core';
import { UsuarioListComponent } from './usuario-list.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';

@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent
  ],
  imports: [
    UsuarioRoutingModule,
    SharedModule
  ],
  exports: [UsuarioListComponent]
})
export class UsuarioModule { }
