import { NgModule } from '@angular/core';
import { ProfissionalUbsListComponent } from './profissional-ubs-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfissionalUbsCreateComponent } from './profissional-ubs-create/profissional-ubs-create.component';
import { ProfissionalUbsEditComponent } from './profissional-ubs-edit/profissional-ubs-edit.component';
import { ProfissionalUbsViewComponent } from './profissional-ubs-view/profissional-ubs-view.component';

const routes: Routes = [
    { path: '', component: ProfissionalUbsListComponent },
    { path: 'novo', component: ProfissionalUbsCreateComponent },
    { path: ':id', component: ProfissionalUbsEditComponent },
    { path: 'view/:id', component: ProfissionalUbsViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionalUbsRoutingModule { }
