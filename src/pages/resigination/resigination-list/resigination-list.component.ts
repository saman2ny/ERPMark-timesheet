import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-resigination-list',
  templateUrl: './resigination-list.component.html',
  styleUrls: ['./resigination-list.component.css']
})
export class ResiginationListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();
  }

}
