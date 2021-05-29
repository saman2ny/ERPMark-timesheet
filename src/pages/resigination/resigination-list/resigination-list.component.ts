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
  selector: 'app-resigination-list',
  templateUrl: './resigination-list.component.html',
  styleUrls: ['./resigination-list.component.css']
})
export class ResiginationListComponent implements OnInit {
  reqObj: any ={
	  "moduleName": "resigination"
  }

  resiginations: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { 

  }
  ngOnInit(): void {
    this.resigination()
    datatblesandIts();
  }

  resigination(){
    this.common.showLoading()
    this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {

      console.log(succ, "datataa")
      // console.log(succ.data, "datataa")
      if (succ.status === 200) {
        this.common.hideLoading()
        this.resiginations = succ.data
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
