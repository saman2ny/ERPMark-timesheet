import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();
  }

}
