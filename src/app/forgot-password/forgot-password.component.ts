import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends OnDestroyMixin implements OnInit {

  form: FormGroup;

  emailSent = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  validateForm(form: FormGroup) {
    for (const control of Object.values(form.controls)) {
      if (control instanceof FormGroup) {
        this.validateForm(control);
      }

      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }

  isFormInvalid(form: FormGroup) {
    this.validateForm(form);
    return form.invalid;
  }

  handleRequest() {
    if (this.isFormInvalid(this.form)) {
      return;
    }

    const email = {
      ...this.form.value
    }

    this.loading = true;
    this.authService.requestPasswordRecovery(this.form.value.email)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (success) => {
          this.emailSent = true;
          this.loading = false;
        },
        (error) => {
          this.messageService.error('Ocorreu um erro inesperado!');
          this.emailSent = false;
          this.loading = false;
        }
      );
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

}
