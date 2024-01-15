import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelAdmGeralListComponent } from '../painel-adm-geral/painel-adm-geral-list.component';
import { PainelAdmGeralCreateComponent } from '../painel-adm-geral/painel-adm-geral-create/painel-adm-geral-create.component';
import { PainelAdmGeralEditComponent } from '../painel-adm-geral/painel-adm-geral-edit/painel-adm-geral-edit.component';

const routes: Routes = [
    { path: '', component: PainelAdmGeralListComponent },
    { path: 'novo', component: PainelAdmGeralCreateComponent },
    { path: ':id', component: PainelAdmGeralEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosAdmNacionalRoutingModule { }
