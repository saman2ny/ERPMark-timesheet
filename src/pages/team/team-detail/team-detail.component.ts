import { Component, OnInit } from '@angular/core';
declare function datatblesandIts(): any;


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    datatblesandIts();

  }

}
