import { NgModule } from '@angular/core';
import { UsuarioListComponent } from './usuario-list.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';

const routes: Routes = [
    { path: '', component: UsuarioListComponent },
    { path: 'novo', component: UsuarioCreateComponent },
    { path: ':id', component: UsuarioEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
