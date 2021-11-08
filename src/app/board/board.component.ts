import { Component, OnInit } from '@angular/core';

enum Difficulty {
  'Easy' = 'Easy',
  'Medium' = 'Medium',
  'Hard' = 'Hard',
}

export enum TaskType {
  'TODO' = 'TODO',
  'InProgress' = 'InProgress',
  'DONE' = 'DONE',
}

export interface Task {
  name: string;
  difficulty: Difficulty;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public difficultyLevels = Object.values(Difficulty);

  TODOs: Task[] = [];
  InPogresses: Task[] = [];
  Dones: Task[] = [];

  taskName: string;
  selectedDifficulty: string;

  todoType = TaskType.TODO;
  inProgressType = TaskType.InProgress;
  doneType = TaskType.DONE;

  constructor() {}

  ngOnInit() {
    this.taskName = '';
    this.selectedDifficulty = 'Select';
  }

  add() {
    if (
      this.taskName.replace(/\s/g, '').length > 0 &&
      this.selectedDifficulty in Difficulty
    ) {
      this.TODOs.push({
        name: this.taskName,
        difficulty: this.selectedDifficulty as Difficulty,
      });
    }
    this.ngOnInit();
  }

  delete(task: Task, taskType: TaskType) {
    switch (taskType) {
      case TaskType.TODO:
        this.TODOs = this.TODOs.filter((x) => x !== task);
        break;
      case TaskType.InProgress:
        this.InPogresses = this.InPogresses.filter((x) => x !== task);
        break;
      case TaskType.DONE:
        this.Dones = this.Dones.filter((x) => x !== task);
        break;
    }
  }

  moveBack(task: Task, taskType: TaskType) {
    this.delete(task, taskType);
    switch (taskType) {
      case TaskType.InProgress:
        this.TODOs.push(task);
        break;
      case TaskType.DONE:
        this.InPogresses.push(task);
        break;
    }
  }

  moveForward(task: Task, taskType: TaskType) {
    this.delete(task, taskType);
    switch (taskType) {
      case TaskType.TODO:
        this.InPogresses.push(task);
        break;
      case TaskType.InProgress:
        this.Dones.push(task);
        break;
    }
  }
}
