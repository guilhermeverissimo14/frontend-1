import { ConsumoLarvicidasRoutingModule } from './consumo-larvicidas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { ConsumoLarvicidasComponent } from './consumo-larvicidas.component';

@NgModule({
  declarations: [
    ConsumoLarvicidasComponent,
  ],
  imports: [
    ConsumoLarvicidasRoutingModule,
    CommonModule,
    NzCardModule,
    NzTableModule,
    FormsModule
  ],
  exports: [ConsumoLarvicidasComponent]
})
export class ConsumoLarvicidasModule { }
