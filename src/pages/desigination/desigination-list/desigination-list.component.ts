import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-desigination-list',
  templateUrl: './desigination-list.component.html',
  styleUrls: ['./desigination-list.component.css']
})
export class DesiginationListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts()
  }

}
