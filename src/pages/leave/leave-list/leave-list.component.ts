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
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  reqObj: any ={
	  "moduleName": "leaveStatus"
  }
  leaveLister: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { 

   // this.loadList()
  }

  ngOnInit(): void {
    this.leaveList()
    datatblesandIts();
  }

  leaveList(){
    this.common.showLoading()
    this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {

      console.log(succ, "datataa")
      // console.log(succ.data, "datataa")
      if (succ.status === 200) {
        this.common.hideLoading()
        this.leaveLister = succ.data
      }
  
      else {
        this.common.hideLoading()
        this.common.showErrorMessage(succ.message)
  
      }

    }, err => {
      console.log("err", err)
      this.common.hideLoading()			
      this.common.showErrorMessage(err.message)

    })
  }

}
