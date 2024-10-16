import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetToDoListResponse } from '../../models/getToDoListResponse';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() toDoFromOtherPage: GetToDoListResponse | null = null;
  @Output() onRemoveClick: EventEmitter<GetToDoListResponse> = new EventEmitter<GetToDoListResponse>();

  constructor(private router: Router) {}

  onRemove() {
    this.onRemoveClick.emit(this.toDoFromOtherPage!);
  }
  onClickDetail() {
    if (this.toDoFromOtherPage) {
      // toDoFromOtherPage nesnesinden ID değerini alıyoruz.
      this.router.navigate(['/todo-card-detail', this.toDoFromOtherPage.id]);
    }
  }
  
}