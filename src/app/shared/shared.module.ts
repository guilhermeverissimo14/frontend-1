import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CepMaskDirective } from './directives/cep-mask.directive';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    CpfMaskDirective,
    CapitalizePipe,
    CpfPipe,
    CepMaskDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzFormModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzPaginationModule,
    NzSelectModule,
    NzOutletModule,
    NzSpinModule,
    NzInputModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzDividerModule,
    NzModalModule,
    NzMessageModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzTagModule,
    NzAlertModule,
    NzPaginationModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzFormModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzPaginationModule,
    NzSelectModule,
    NzOutletModule,
    NzSpinModule,
    NzInputModule,
    NzInputNumberModule,
    NzCheckboxModule,
    BaseLayoutComponent,
    NzDividerModule,
    NzModalModule,
    NzMessageModule,
    NzDropDownModule,
    CpfMaskDirective,
    NzDatePickerModule,
    CapitalizePipe,
    CpfPipe,
    NzTagModule,
    CepMaskDirective,
    NzAlertModule,
    NzPaginationModule
  ]
})
export class SharedModule { }
