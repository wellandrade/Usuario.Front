import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlunoService } from './../../service/aluno.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  alunoForm: FormGroup;

  constructor(public modal: MatDialogRef<ModalComponent>,
              private fb: FormBuilder,
              private alunoService: AlunoService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      sobrenome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }

  salvar(): void {
    this.alunoService.cadastrarAluno(this.alunoForm.value).subscribe(dados => {
      this.mensagem('Aluno cadastrado com sucesso.');

      window.location.reload();
    }, (error) => {
      this.mensagem('Falha ao cadastrar aluno ' + error);
    });
  }

  mensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'X', {
      duration: 1000,
    });
  }

  fecharModal(): void {
    this.modal.close();
  }
}

