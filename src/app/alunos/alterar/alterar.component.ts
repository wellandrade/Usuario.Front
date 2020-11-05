import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Aluno } from 'src/app/shared/model/aluno';
import { AlunoService } from './../../service/aluno.service';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})

export class AlterarComponent implements OnInit {

  aluno: Aluno;
  alterarAlunoForm: FormGroup;

  constructor(private alunoService: AlunoService,
              public modal: MatDialogRef<AlterarComponent>,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data) {
                 const idAlunoSelecionado = JSON.parse(JSON.stringify(data));
                 this.obterAluno(idAlunoSelecionado.id);
              }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.alterarAlunoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      email: new FormControl(''),
      dataNascimento: new FormControl(''),
      escolaridade: new FormControl('')
    });
  }

  obterAluno(idAluno: number): void {

    this.alunoService.obterAlunoPorId(idAluno).subscribe(dados => {
      this.aluno = dados;

      this.popularFormulario(this.aluno);
    });
  }

  fecharModal(): void {
    this.modal.close();
  }

  salvar(): void {
    console.log(this.alterarAlunoForm.value);

    this.alunoService.alterarAluno(this.alterarAlunoForm.value).subscribe(dados => {
      this.mensagem('Alteração efetuada com sucesso.');

      window.location.reload();
    }, (error) => {
      this.mensagem('Falha ao efetuar alteração' + error);
    });

    this.alterarAlunoForm.reset();
  }

  popularFormulario(aluno: Aluno): void {

    this.alterarAlunoForm = new FormGroup({
      id: new FormControl(aluno.id),
      nome: new FormControl(aluno.nome, Validators.required),
      sobrenome: new FormControl(aluno.sobrenome, Validators.required),
      email: new FormControl(aluno.email, Validators.required),
      dataNascimento: new FormControl(aluno.dataNascimento),
      escolaridade: new FormControl(aluno.escolaridade)
    });
  }

  mensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'X', {
      duration: 1000,
    });
  }

  receberPedido(valor): void {
    console.log(valor);
  }
}
