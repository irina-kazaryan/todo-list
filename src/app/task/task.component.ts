import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskType } from '../board/board.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() taskType: TaskType;

  @Output() deleteRequest = new EventEmitter<Task>();
  @Output() moveBackRequest = new EventEmitter<Task>();
  @Output() moveForwardRequest = new EventEmitter<Task>();

  showBack: boolean;
  showForward: boolean;
  showDelete: boolean;

  constructor() {}

  ngOnInit() {
    this.showBack = this.taskType !== TaskType.TODO;
    this.showForward = this.taskType !== TaskType.DONE;
    this.showDelete = this.taskType === TaskType.TODO;
  }

  delete() {
    this.deleteRequest.emit(this.task);
  }

  moveBack() {
    this.moveBackRequest.emit(this.task);
  }

  moveForward() {
    this.moveForwardRequest.emit(this.task);
  }
}
