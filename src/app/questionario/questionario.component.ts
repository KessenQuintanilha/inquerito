import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionarioService } from '../services/questionario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})

export class QuestionarioComponent implements OnInit {

  title = 'Questionário';
  texto_principal= "A procura de uma melhoria contínua dos serviços prestados é o principal compromisso assumido por esta organização. Neste sentido, conhecer o grau de satisfação dos clientes é fundamental. Disso depende a criação de novas alternativas e a oferta de um atendimento cada vez mais eficaz. Colabore com a nossa organização na prossecução dessa meta, preenchendo este questionário. Tenha presente que pretendemos a sua opinião pessoal e objectiva relativamente aos nossos serviços."
  instrucao= "Classifique cada resposta de 1 a 10 , em que 1-Muito mau e 10-Excelente"
  tempo_intervencao= "Tempos de resposta da intervenção face ao pedido *"
  qualidade_atendimento= "Qualidade da solução da intervenção face ao pedido *"
  recomendacao_trabalho= "Como classifica de um modo geral o trabalho realizado , de forma a recomenda-lo a alguém ou a recorrer novamente ao nosso serviço *"

  opcoes: number[] = new Array(10);

  formInquerito!: FormGroup;

  // Variaveis 
  ID_Chamado!: number;
  ID_Cliente!: number;
  User_responsavel!: number; 
   
  constructor(private route: ActivatedRoute , private questionarioService: QuestionarioService, private fb: FormBuilder){
    console.log('Componente construtor');
    this.opcoes = Array.from(Array(10), (e, i) => i + 1); }

  ngOnInit() {
    this.formInquerito = this.fb.group({
    tempo_resposta: [null, Validators.required],// trocar por variaveis da bd
    qualidade_intervencao: [null, Validators.required], // trocar por variaveis da bd
    recomendacao: [null, Validators.required], // trocar por variaveis da bd
    observacoes: null
  })

    this.route.queryParamMap.subscribe(params => {

    this.ID_Chamado = Number(params.get('id_chamado'));
    this.ID_Cliente = Number(params.get('id_cliente'));
    this.User_responsavel = Number(params.get('user_responsavel'));

/* Utilizado para debug
    console.log (this.ID_Chamado);
    console.log(this.ID_Cliente);
    console.log(this.User_responsavel);
    */
})

}

enviarQuestionario() {
  if (this.formInquerito.valid) {
    const respostasFormulario = {
      iD_Chamado: this.ID_Chamado,
      iD_Cliente: this.ID_Cliente,
      user_responsavel : this.User_responsavel,
      Tempo_Resposta: this.formInquerito.get('tempo_resposta')?.value,
      Qualidade_Intervencao: this.formInquerito.get('qualidade_intervencao')?.value,
      Recomendacao: this.formInquerito.get('recomendacao')?.value,
      Observacoes: this.formInquerito.get('observacoes')?.value,
    };

    // Substitua 'URL_DA_API' pela URL da sua API externa
    this.questionarioService.enviarQuestionario(respostasFormulario).subscribe(
      (response) => { 
        // Trate a resposta da API conforme necessário
        console.log('Resposta da API:', response);
        alert(response);
      },
      (error) => {
        console.error('Erro ao enviar resposta:', error);
        alert('Erro ao enviar resposta.');
      }
    );
  } else {
    alert('Por favor, preencha todas as perguntas antes de enviar.');
  }
}

Finalizar(){

  const ID_Chamado = this.ID_Chamado;

  if (ID_Chamado) {
    // Se ID_Chamado existe, faça a verificação
    this.questionarioService.checkIfIDChamadoExists(ID_Chamado).subscribe((response: boolean) => {
      if (response) {
        alert('O feedback relativamente a este PAT já se encontra registado.');
      } else {
        this.enviarQuestionario();
      }
    },
    (error) => {
      console.error('Erro ao se comunicar com o servidor:', error);
      alert('Ocorreu um erro ao tentar enviar os dados. Por favor, reporte este erro para o e-mail: phc@pt.a2it.com');
    }
    );
  } 
}
}