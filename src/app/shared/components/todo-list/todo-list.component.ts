import { GetToDoListResponse } from './../../models/getToDoListResponse';
import { HttpClient } from '@angular/common/http';
import { TodoCardComponent } from './../todo-card/todo-card.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createToDoRequest } from '../../models/createToDoRequest';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  newTodoTitle: string = "";
  newTodoUserId: number = 0;
  toDoListFromBackend: GetToDoListResponse[] = [];
  
  // Dependency Injection
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  // Todo'yu ekleme metodu
  add(): void {
    if (this.newTodoTitle.trim().length > 0) {
      const newTodoElement: GetToDoListResponse = {
        id: this.toDoListFromBackend.length + 1, // ID'yi belirliyoruz
        userId: this.newTodoUserId, // Kullanıcı ID'si
        title: this.newTodoTitle, // Başlık
        completed: false // Tamamlanmamış olarak ayarlıyoruz
      };
      this.toDoListFromBackend.push(newTodoElement);
    }
    this.newTodoTitle = '';
    this.newTodoUserId = 0;
  }

  // Yeni todo'yu backend'e gönderir
  addTodo(): void {
    const newTodoRequest: createToDoRequest = {
      userId: this.newTodoUserId,
      title: this.newTodoTitle
    };

    this.httpClient.post<GetToDoListResponse>('https://jsonplaceholder.typicode.com/todos', newTodoRequest)
      .subscribe({
        next: (response) => {
          this.add(); // Ekleme işlemini gerçekleştirin
        },
        error: (err) => {
          console.log('HATA', err);
        }
      });
  }

  // Todo'yu kaldır
  remove(todo: GetToDoListResponse) {
    this.toDoListFromBackend = this.toDoListFromBackend.filter((item) => item.id !== todo.id);
  }

  // Todo'yu silme metodu
  deleteTodo(id: number) {
    this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe({
        next: () => {
          this.remove({ id } as GetToDoListResponse); // Silme işlemi
        },
        error: (err: any) => {
          console.log('HATA', err);
        }
      });
  }

  fetchTodos() {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
  }
}
