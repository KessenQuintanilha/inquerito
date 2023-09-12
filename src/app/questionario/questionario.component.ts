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

  title = 'Projeto-3';
  texto1= "A procura de uma melhoria contínua dos serviços prestados é o principal compromisso assumido por esta organização. Neste sentido, conhecer o grau de satisfação dos clientes é fundamental. Disso depende a criação de novas alternativas e a oferta de um atendimento cada vez mais eficaz. Colabore com a nossa organização na prossecução dessa meta, preenchendo este questionário. Tenha presente que pretendemos a sua opinião pessoal e objectiva relativamente aos nossos serviços."
  texto2= "Classifique cada resposta de 1 a 10 , em que 1-Muito mau e 10-Excelente"
  texto3= "Tempos de resposta da intervenção face ao pedido *"
  texto4= "Qualidade da solução da intervenção face ao pedido *"
  texto5= "Como classifica de um modo geral o trabalho realizado , de forma a recomenda-lo a alguém ou a recorrer novamente ao nosso serviço *"

  opcoes: number[] = new Array(10);

  formInquerito!: FormGroup;

  // Variaveis 

  ID_Chamado!: number;
  ID_Cliente!: number;
  User_responsavel!: number;
 
  

   
  constructor(private route: ActivatedRoute , private questionarioService: QuestionarioService, private fb: FormBuilder){
    console.log('Componente construtor');
    this.opcoes = Array.from(Array(10), (e, i) => i + 1);
}

  ngOnInit() {
    this.formInquerito = this.fb.group({
    Tempo_Resposta: [null, Validators.required],// trocar por variaveis da bd
    Qualidade_Intervencao: [null, Validators.required], // trocar por variaveis da bd
    Recomendacao: [null, Validators.required], // trocar por variaveis da bd
    Observacoes: null
  })


    this.route.queryParamMap.subscribe(params => {

    this.ID_Chamado = Number(params.get('id_chamado'));
    this.ID_Cliente = Number(params.get('id_cliente'));
    this.User_responsavel = Number(params.get('user_responsavel'));

    console.log (this.ID_Chamado);
    console.log(this.ID_Cliente);
    console.log(this.User_responsavel);
})

}

enviarQuestionario() {
  if (this.formInquerito.valid) {
    const data = {
      Tempo_Resposta: this.formInquerito.get('tempo_resposta')?.value,
      Qualidade_Intervencao: this.formInquerito.get('qualidade_intervencao')?.value,
      Recomendacao: this.formInquerito.get('recomendacao')?.value,
      Observacoes: this.formInquerito.get('observacoes')?.value,
    };

    // Substitua 'URL_DA_API' pela URL da sua API externa
    this.questionarioService.enviarQuestionario('URL_DA_API', data).subscribe(
      (response) => {
        // Trate a resposta da API conforme necessário
        console.log('Resposta da API:', response);
        alert('Resposta Enviada com Sucesso!!');
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
//consultarrespostas() {}

ChamarFuncao(){

  const ID_Chamado = this.ID_Chamado;

  if (ID_Chamado) {
    // Se ID_Chamado existe, faça a verificação
    this.questionarioService.checkIfIDChamadoExists(ID_Chamado).subscribe((response: boolean) => {
      if (response) {
        alert('Questionário já respondido.');
      } else {
        this.enviarQuestionario();
      }
    });
  } else {
    alert('Chamado Inexistente.');
}
}
}