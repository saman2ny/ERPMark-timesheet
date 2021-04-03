import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();
  }

}
