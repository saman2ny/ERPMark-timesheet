import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();

  }

}
