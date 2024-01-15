import { FormGroup } from '@angular/forms';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { isFormInvalid } from './form-utils';
import { NzMessageService } from 'ng-zorro-antd/message';

export abstract class BaseFormComponent extends OnDestroyMixin {

  form: FormGroup;

  loading = false;

  constructor(
    protected messageService: NzMessageService
  ) {
    super();
  }

  handleSubmit() {

    if (isFormInvalid(this.form)) {
      this.messageService.warning('Preencha os campos obrigatórios!');
      return;
    }

    this.loading = true;
    this.doSubmit()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (result) => {
          this.onSubmitSuccess(result);
          this.loading = false;
        },
        (error) => {
          this.onSubmitError(error);
          this.loading = false;
        }
      );
  }

  abstract doSubmit(): Observable<any>;

  onSubmitSuccess(_result: any): void { }

  onSubmitError(_error: any): void { }

}
