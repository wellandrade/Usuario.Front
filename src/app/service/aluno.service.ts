import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Aluno } from '../shared/model/aluno';
import { Retorno } from './../shared/model/retorno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  // Colocar em arquivo de configuracao
  apiUrl = 'https://localhost:44365/api/v1';

  constructor(private http: HttpClient) { }

  public obterAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl + '/listarAlunos');
  }

  public obterAlunoPorId(idAluno: number): Observable<Aluno> {
    return this.http.get<Aluno>(this.apiUrl + '/obterAlunoPorId?idAluno=' + idAluno);
  }

  public cadastrarAluno(aluno: Aluno): Observable<Retorno> {

    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Retorno>(this.apiUrl + '/cadastrarAluno', aluno, httpOptions);
  }

  public removerAluno(idAluno: number): Observable<Retorno> {
    return this.http.delete<Retorno>(this.apiUrl + '/excluirAluno?idAluno=' + idAluno);
  }

  public alterarAluno(aluno: Aluno): Observable<Retorno> {

    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<Retorno>(this.apiUrl + '/alterarAluno', aluno, httpOptions);
  }
}
