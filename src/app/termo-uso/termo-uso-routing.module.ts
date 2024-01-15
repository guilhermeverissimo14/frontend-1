import { NgModule } from '@angular/core';
import { TermoUsoComponent } from './termo-uso.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: TermoUsoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoUsoRoutingModule { }
