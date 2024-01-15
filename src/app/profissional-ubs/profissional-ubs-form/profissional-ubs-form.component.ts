import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { PacienteDTO } from 'src/app/models/Paciente';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { BaseFormComponent } from 'src/app/shared/utils/base-form';
import { Location } from '@angular/common';
import { format, isThursday } from 'date-fns';
import { Cidade, cidades } from 'src/app/shared/utils/cidades';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profissional-ubs-form',
  templateUrl: './profissional-ubs-form.component.html',
  styleUrls: ['./profissional-ubs-form.component.css'],
})
export class ProfissionalUbsFormComponent extends BaseFormComponent implements OnInit {

  @Input() paciente: PacienteDTO | null = null;

  tiposAnalise = [
    { label: 'Clínica', value: 'CLINICA' },
    { label: 'Laboratorial', value: 'LABORATORIAL' },
  ];

  tiposArbovirose = [
    { label: 'Dengue', value: 'DENGUE' },
    { label: 'Chikungunya', value: 'CHIKUNGUNYA' },
    { label: 'Zika', value: 'ZIKA' },
    { label: 'Febre Amarela', value: 'FEBRE_AMARELA' },
    { label: 'Leishmaniose', value: 'LEISHMANIOSE' },
  ];

  tiposResultados = [
    { label: 'Em Análise', value: 'EM_ANALISE' },
    { label: 'Positivo', value: 'POSITIVO' },
    { label: 'Negativo', value: 'NEGATIVO' }
  ];

  condicional = [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ];

  estados = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
    { label: 'Distrito Federal', value: 'DF' }
  ];

  cidadeOptions = [];

  isImportado = false;

  constructor(
    private pacienteService: PacienteService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    protected messageService: NzMessageService
  ) {
    super(messageService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.addCidadesOptions();
  }

  buildForm() {
    this.form = this.fb.group({

      nome: [this.paciente?.nome, Validators.required],
      dataNascimento: [this.paciente?.dataNascimento, Validators.required],
      cpf: [
        this.getCpfFormatado(this.paciente?.cpf),
        [Validators.required, Validators.minLength(14)],
      ],
      cartaoSus: [this.paciente?.cartaoSus, Validators.required],
      logradouro: [this.paciente?.logradouro, Validators.required],
      bairro: [this.paciente?.bairro, Validators.required],
      cidade: [this.paciente?.cidade, Validators.required],
      importado: [{value : this.paciente?.cidade == this.authService.authenticatedUser.cidade &&
        this.paciente?.estado == this.authService.authenticatedUser.estado, disabled: this.isEditing}],
      cep: [
        this.getCepFormatado(this.paciente?.cep),
        [Validators.required, Validators.minLength(9)]
      ],
      estado: [{value: this.paciente?.estado, disabled: this.isImportado}, Validators.required],
      numero: [this.paciente?.numero, Validators.required],
      tipoArbovirose: [this.paciente?.tipoArbovirose, Validators.required],
      tipoAnalise: [this.paciente?.tipoAnalise, Validators.required],
      analisePaciente: [this.paciente?.analisePaciente, Validators.required],
      observacao: [this.paciente?.observacao, Validators.required],
      obito: [this.paciente?.obito, Validators.required],
      obitoSuspeito: [this.paciente?.obitoSuspeito, Validators.required],
      internado: [this.paciente?.internado, Validators.required]

    });
    console.log(this.paciente.obito)
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

  changeImportado(event: any) {
    this.isImportado = event;
    if (event) {
      this.form.get("estado").disable();
      this.form.get("estado").setValue(this.authService.authenticatedUser.estado);
      this.form.get("cidade").disable();
      this.form.get("cidade").setValue(this.authService.authenticatedUser.cidade);
      this.form.get("cep").setValue("");
      this.form.get("bairro").setValue("");
      this.form.get("logradouro").setValue("");
      this.form.get("numero").setValue("");
    } else {
      this.form.get("estado").enable();
      this.form.get("estado").setValue("");
      this.form.get("cidade").enable();
      this.form.get("cidade").setValue("");
      this.form.get("cep").setValue("");
      this.form.get("bairro").setValue("");
      this.form.get("logradouro").setValue("");
      this.form.get("numero").setValue("");
    }
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
      if (!this.form.value.importado) {
        if (address.localidade == this.authService.authenticatedUser.cidade || address.uf == this.authService.authenticatedUser.estado) {
          this.messageService.error("O CEP informado pertece ao municipio e/ou estado do usuário logado e está marcado como importado");
          this.form.get("cep").setValue("")
          return
        }
      } else {
        if (address.localidade != this.authService.authenticatedUser.cidade || address.uf != this.authService.authenticatedUser.estado) {
          this.messageService.error("O CEP informado não pertece ao municipio e/ou estado do usuário logado!");
          this.form.get("cep").setValue("")
          return
        }
      }
      this.form.controls.estado.setValue(address.uf)
      this.form.controls.cidade.setValue(address.localidade);
      this.form.controls.logradouro.setValue(address.logradouro);
      this.form.controls.bairro.setValue(address.bairro);
    } catch (error) {
      this.messageService.error('Ocorreu um erro em um serviço externo');
    }
  }

  get isCreating() {
    return this.paciente == null;
  }

  get isEditing() {
    return this.paciente != null;
  }

  toDate(dateStr: string) {
    const parts = dateStr.split('/');
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  doSubmit(): Observable<any> {
    const params = {
      ...this.form.value,
      id: this.paciente?.id,
      cpf: this.cpfControl.value.replace(/[^\d]+/g, ''),
      cep: this.form.controls.cep.value.replace(/\D/g, ''),
      dataNascimento: format(this.toDate(this.form.value.dataNascimento), 'yyyy-MM-dd'),
      ubsId: this.authService.authenticatedUser.ubs.id,
      cidade: this.authService.authenticatedUser.cidade,
      estado: this.authService.authenticatedUser.estado
    };

    const newBirthdate = new Date(params.dataNascimento);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    if (newBirthdate >= tomorrowDate) {
      return new Observable(observer => {
          this.messageService.error('A data de nascimento não deve ser superior a atual');
          this.loading = false;
          observer.complete();
          return;
      });
    }

    if (this.isCreating) {
      return this.pacienteService.create(params);
    } else {
      return this.pacienteService.update(params);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onTypingDate(event: any) {
    event.target.value = event.target.value
      .replace(/^(\d\d)(\d)$/g, '$1/$2')
      .replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2')
      .replace(/[^\d\/]/g, '');
  }

  onSubmitSuccess(): void {
    this.router.navigate(['painel-profissional-ubs']);

    if (this.isCreating) {
      this.messageService.success('Paciente criado com sucesso');
    } else {
      this.messageService.success('Paciente atualizado com sucesso');
    }
  }

  goBack() {
    this.location.back();
  }

  handleCpfMaxDigits(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (
      input.value.length >= 14 &&
      event.keyCode !== 8 &&
      event.keyCode !== 46
    ) {
      event.preventDefault();
    }
  }

  get cpfControl() {
    return this.form.get('cpf') as FormControl;
  }

  getCpfFormatado(value: any) {
    if (!value) {
      return '';
    }

    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getCepFormatado(value: any) {
    if (!value) {
        return '';
    }

    const cep = value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return cep;
    }

    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}
