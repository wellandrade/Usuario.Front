import { AlunoService } from './../../service/aluno.service';
import { Component, OnInit, Output } from '@angular/core';

import { Aluno } from './../../shared/model/aluno';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlterarComponent } from '../alterar/alterar.component';
import { config } from 'process';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})

export class ListarComponent implements OnInit {

  aluno: Aluno[];

  titulosColuna: string[] = ['id', 'nome', 'email', 'dataNascimento', 'nivelEscolaridade', 'remover', 'alterar'];

  constructor(private alunoService: AlunoService,
              public modal: MatDialog) { }

  ngOnInit(): void {
    this.listarAlunos();
  }

  listarAlunos(): void {

    this.alunoService.obterAlunos().subscribe(dados => {
      this.aluno = dados;
    });
  }

  removerAluno(idAluno: number): void {
    this.alunoService.removerAluno(idAluno).subscribe(dados => {
      this.listarAlunos();
    }, (error) => {
      console.error(error);
    });
  }

  alterarAluno(idAluno: number): void {
    this.abrirModal(idAluno);
  }

  abrirModal(idAluno: number): void {

    const parametroModal = new MatDialogConfig();

    parametroModal.data = {
      id: idAluno
    };

    this.modal.open(AlterarComponent, parametroModal);
  }
}
