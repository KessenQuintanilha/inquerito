import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})

export class QuestionarioService {

  private apiUrl = 'http://localhost:4200/Inquerito'; // inserir api real
  constructor(private http: HttpClient) {}
/*
  setValues(ID_Chamado: number, ID_Cliente: number, User_responsavel: number) {
    this.ID_Chamado = ID_Chamado;
    this.ID_Cliente = ID_Cliente;
    this.User_responsavel = User_responsavel;
  }
  

  getValues() {
    return {
      ID_Chamado: this.ID_Chamado,
      ID_Cliente: this.ID_Cliente,
      User_responsavel: this.User_responsavel
    };
  }
  */
  checkIfIDChamadoExists(ID_Chamado: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/getpat?id_chamado=${ID_Chamado}`);
  }

  enviarQuestionario( respostasFormulario: any): Observable<any> {
    // Para Debug
    //console.log(JSON.stringify(respostasFormulario));
    return this.http.post(`${this.apiUrl}/InsertResposta`,   JSON.stringify(respostasFormulario),httpOptions);

  }
}
