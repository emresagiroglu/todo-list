import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetToDoResponse } from '../../models/getToDoResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-card-details',
  standalone: true,
  imports: [],
  templateUrl: './todo-card-details.component.html',
  styleUrls: ['./todo-card-details.component.scss'] // Doğru bir şekilde "styleUrls" olmalı
})
export class TodoCardDetailsComponent implements OnInit {
  todoCardDetailId: number = 0; // Todo ID'sini saklamak için bir değişken
  todoDetail: GetToDoResponse | null = null; // Detayları saklamak için bir değişken

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // ID değerini route parametrelerinden alıyoruz
    this.route.params.subscribe(params => {
      this.todoCardDetailId = +params['id']; // + operatörü ile string'i number'a çeviriyoruz
      this.fetchTodoDetail(); // Detayları al
    });
  }

  fetchTodoDetail() {
    this.httpClient
      .get<GetToDoResponse>(`https://jsonplaceholder.typicode.com/todos/${this.todoCardDetailId}`)
      .subscribe({
        next: (response: GetToDoResponse) => {
          this.todoDetail = response; // Detayları alıp saklıyoruz
        },
        error: (err: any) => {
          console.log('HATA', err);
        }
      });
  }

  updateTodo() {
    if (this.todoDetail) {
      // Güncelleme için PUT isteği gönderiyoruz
      this.httpClient
        .put<GetToDoResponse>(`https://jsonplaceholder.typicode.com/todos/${this.todoCardDetailId}`, {
          title: this.todoDetail.title,
          userId: this.todoDetail.userId,
          completed: this.todoDetail.completed
        })
        .subscribe({
          next: () => {
            alert('Başarıyla güncellendi!'); // Başarılı güncelleme mesajı
            this.fetchTodoDetail(); // Detayları tekrar alarak güncel durumu yansıt
          },
          error: (err: any) => {
            console.log('Güncelleme Hatası', err);
          }
        });
    }
  }
}
