import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Role } from '../models/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends OnDestroyMixin implements OnInit {

  form: FormGroup;

  visiblePassword = false;
  termoUsoVisible = false;
  loginAllowed = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
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

  handleLogin() {
    if(this.isFormInvalid(this.form)) {
      return;
    }

    if (!this.loginAllowed) {
      this.messageService.warning('É preciso concordar com o termo de uso!');
      return;
    }

    this.loading = true;
    this.authService.login(this.form.value.email, this.form.value.senha)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (user) => {
          if (user.tipoUsuario == Role.ROLE_ADMINISTRADOR_GERAL) {
            this.router.navigate(['painel-adm-geral']);
          } else if (user.tipoUsuario == Role.ROLE_ADMINISTRADOR_ESTADUAL) {
            this.router.navigate(['painel-adm-estadual']);
          } else if (user.tipoUsuario == Role.ROLE_ADMINISTRADOR_NACIONAL) {
            this.router.navigate(['painel-adm-nacional']);
          } else if (user.tipoUsuario == Role.ROLE_UBS) {
            this.router.navigate(['painel-ubs']);
          } else if (user.tipoUsuario == Role.ROLE_PROFISSIONAL_UBS) {
            this.router.navigate(['painel-profissional-ubs']);
          } else if (user.tipoUsuario == Role.ROLE_ADMINISTRADOR_MUNICIPAL) {
            this.router.navigate(['painel-adm-municipal']);
          }

          this.loading = false;
        },
        (error) => {
          if (error.error.message == "Bad credentials") {
            this.messageService.error("Credenciais inválidas!")
          }
          this.loading = false;
        }
      )
  }

  gotoTermoUso() {
    if (this.loginAllowed) {
      this.messageService.info('Você já concordou com o termo de uso!');
      return;
    }

    this.termoUsoVisible = true;
  }

  handleCloseModal() {
    this.termoUsoVisible = false;
    this.loginAllowed = true;
  }

}
