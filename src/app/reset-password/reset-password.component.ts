import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends OnDestroyMixin implements OnInit {

  form: FormGroup;

  visiblePassword = false;
  visibleConfirmPassword = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      senha: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
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

    if (this.form.value.senha != this.form.value.passwordConfirm) {
      this.messageService.warning('As senhas não correspondem!');
      return;
    }

    const newPassword = this.form.value.senha;
    const token = this.route.snapshot.paramMap.get('token');

    this.loading = true;
    this.authService.changePasswordByToken(newPassword, token)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (success) => {
          this.messageService.success('Senha alterada com sucesso!');
          this.router.navigate(['login']);
          this.loading = false;
        },
        (error) => {
          console.log('Erro na alteração de senha:', error);
          this.messageService.error('Ocorreu um erro inesperado!');
          this.loading = false;
        }
      );
  }

}
