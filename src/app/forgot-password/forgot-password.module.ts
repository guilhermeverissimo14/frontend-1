import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
