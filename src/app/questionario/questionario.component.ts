import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})
export class QuestionarioComponent implements OnInit {

  title = 'Projeto-3';
  texto1 = '';
  texto2 = '';
  texto3 = '';
  texto4 = '';
  texto5 = '';
  
  confirmacao(){
    alert('Enviado com Sucesso!!')
  }
  
  constructor(){
    console.log('Componente construtor')
}

ngOnInit() {
  this.texto1= "A procura de uma melhoria contínua dos serviços prestados é o principal compromisso assumido por esta organização. Neste sentido, conhecer o grau de satisfação dos clientes é fundamental. Disso depende a criação de novas alternativas e a oferta de um atendimento cada vez mais eficaz. Colabore com a nossa organização na prossecução dessa meta, preenchendo este questionário. Tenha presente que pretendemos a sua opinião pessoal e objectiva relativamente aos nossos serviços."
  this.texto2= "Classifique cada resposta de 1 a 10 , em que 1-Muito mau e 10-Excelente"
  this.texto3= "Tempos de resposta da intervenção face ao pedido *"
  this.texto4= "Qualidade da solução da intervenção face ao pedido *"
  this.texto5= "Como classifica de um modo geral o trabalho realizado , de forma a recomenda-lo a alguém ou a recorrer novamente ao nosso serviço *"
}

ChamarFuncao(){
  console.log('Finaliza Inquérito');
}

}

