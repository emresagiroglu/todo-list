import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './shared/components/todo-list/todo-list.component';
import { TodoCardDetailsComponent } from './shared/components/todo-card-details/todo-card-details.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  {path : 'todo-list', component: TodoListComponent},
  { path: 'todo-card-detail/:id', component: TodoCardDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }