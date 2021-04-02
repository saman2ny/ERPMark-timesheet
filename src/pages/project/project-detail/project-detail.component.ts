import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();

  }

}
