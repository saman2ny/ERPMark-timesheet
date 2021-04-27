import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
// import * as $ from 'jquery'
declare var $: any;
declare function datatblesandIts(): any;


@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {
  holidayList:  any = []
  
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { }

  ngOnInit(): void {
    datatblesandIts();
    this.initalLoadUp()

  }
  initalLoadUp(){
    this.holidayList = [
      {id: "1", name:"sam", date:"sam", time:"sam", status:"sam"},
      {id: "2", name:"antony", date:"sam", time:"sam", status:"sam"},
      {id: "3", name:"teminos", date:"sam", time:"sam", status:"sam"},
      {id: "4", name:"joseph",date:"sam", time:"sam", status:"sam"},
    ]
  }

}
