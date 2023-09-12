import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionarioService {

  private apiUrl = 'http://localhost:3000'; // inserir api real

  private ID_Chamado!: number;
  private ID_Cliente!: number;
  private User_responsavel!: number;

  constructor(private http: HttpClient) {}

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
  
  checkIfIDChamadoExists(ID_Chamado: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-chamado/${ID_Chamado}`);
  }

  enviarQuestionario(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }
}
