import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    ResetPasswordRoutingModule,
    SharedModule
  ],
  exports: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
