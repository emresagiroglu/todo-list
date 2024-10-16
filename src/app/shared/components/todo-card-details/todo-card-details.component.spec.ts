import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardDetailsComponent } from './todo-card-details.component';

describe('TodoCardDetailsComponent', () => {
  let component: TodoCardDetailsComponent;
  let fixture: ComponentFixture<TodoCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCardDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
