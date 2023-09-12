import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionarioComponent } from './questionario/questionario.component';

const routes: Routes = [

  { path: '', redirectTo: '/questionario', pathMatch: 'full' }, 
  { path: 'questionario', component: QuestionarioComponent }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }




