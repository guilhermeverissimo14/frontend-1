import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/utils/base-form';
import { Location } from '@angular/common';
import { estados } from 'src/app/shared/utils/estados';
import { Cidade, cidades } from 'src/app/shared/utils/cidades';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { UbsService } from 'src/app/services/ubs.service';

@Component({
  selector: 'app-ubs-estadual-form',
  templateUrl: './ubs-estadual-form.component.html',
  styleUrls: ['./ubs-estadual-form.component.css']
})
export class UbsEstadualFormComponent extends BaseFormComponent implements OnInit {
  
  estadoSigla = this.authService.authenticatedUser.estado;
  cidadeOptions = [];
  estado = "";
  

  constructor(
    private authService: AuthService,
    private ubsService: UbsService,
    private utilsService: UtilsService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    protected messageService: NzMessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.addCidadesOptions();
    this.getEstadoNomeBySigla(this.estadoSigla);
    this.buildForm();
    this.listCidadeByEstado();
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      cnes: [null, Validators.required],
      cep: [null, Validators.required],
      estado: [{value: this.estado, disabled: true}],
      municipio: [null, Validators.required],
      bairro: [null, Validators.required],
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
    });
  }

  getEstadoNomeBySigla(estadoSigla: string) {
    const estadoNome = estados[estados.findIndex((element) => element.value == estadoSigla)].label;
    this.estado = estadoNome;
  }

  addCidadesOptions() {
    cidades.forEach((cidade) => {
      const cidadeObject = new Cidade(cidade.cidade)
      this.cidadeOptions.push(cidadeObject);
    });

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  listCidadeByEstado() {
    this.cidadeOptions = [];
    cidades.forEach((cidade) => {
      if (cidade.estado == this.estadoSigla) {
        const cidadeObject = new Cidade(cidade.cidade)
        this.cidadeOptions.push(cidadeObject);
      }
    })

    this.cidadeOptions.sort((c1, c2) => {
      const label1 = c1.label.toLowerCase();
      const label2 = c2.label.toLowerCase();
      return label1.localeCompare(label2);
    });
  }

  async handleCep() {
    if (this.form.controls.cep.value?.length == 9) {
      try {
        const cep = this.form.controls.cep.value.replace(/\D/g, '');
        await this.searchAddressByCep(cep);
      } catch (error) {
        this.messageService.error('Ocorreu um erro em um serviço externo');
      }
    }
  }

  async searchAddressByCep(cep: string) {
    try {
      const address = await this.utilsService.getAddressByCep(cep).toPromise();
      if (address.uf != this.estadoSigla) {
        this.messageService.error("O CEP informado não pertece ao estado do usuário logado!");
        return
      }
      this.form.controls.municipio.setValue(address.localidade);
      this.form.controls.logradouro.setValue(address.logradouro);
      this.form.controls.bairro.setValue(address.bairro);
    } catch (error) {
      this.messageService.error('Ocorreu um erro em um serviço externo');
    }
  }

  doSubmit(): Observable<any> {
    const params = {
      ...this.form.value,
      estado: this.estadoSigla,
      cep: this.form.controls.cep.value.replace(/\D/g, '')
    };

    return this.ubsService.create(params);
  }

  handleKeyPress(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onSubmitSuccess(): void {
    this.router.navigate(['ubs-estadual']);
    this.messageService.success('UBS criada com sucesso');
  }

  goBack() {
    this.location.back();
  }

}
