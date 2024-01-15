import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicePendenciaComponent } from './indice-pendencia.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IndicePendenciaRoutingModule } from './indice-pendecia-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndicePendenciaComponent,
  ],
  imports: [
    IndicePendenciaRoutingModule,
    CommonModule,
    NzCardModule,
    NzTableModule,
    FormsModule
  ],
  exports: [IndicePendenciaComponent]
})
export class IndicePendenciaModule { }
