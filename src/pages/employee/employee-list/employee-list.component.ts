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
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	EmployeerForm: FormGroup;
  employeer: any ={}
  reqObj: any ={
	  "moduleName": "employee"
  }
  employeerList: any =[]
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { }

  ngOnInit(): void {
    datatblesandIts()
	this.employeeList()

    this.EmployeerForm = this.formBuilder.group({
			opFirstName: ['', Validators.compose([Validators.required])],
			opLastName: ['', Validators.required],
			opUserName: ['', Validators.required],
			opEmailId: ['', Validators.required],
			opPassword: ['', Validators.required],
			opConfirmPassword: ['', Validators.required],
			opEmployeeId: ['', Validators.required],
			opPhoneId: ['', Validators.required],
			opEmpDesg: ['', Validators.required],
			opEmpDepart: ['', Validators.required],
		});

  }

  goEmployeerLogin(){

    if (this.EmployeerForm.invalid) {
			this.EmployeerForm.markAllAsTouched();
			return;
		} else {
      this.common.hideLoading()
    }
  }

  employeeList(){

	this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {
		console.log(succ.data, "datataa")
		if (succ.code == 200) {
			this.employeerList = succ.data
		}


		else {
			this.common.hideLoading()
			this.common.showErrorMessage(succ.message)
			this.router.navigateByUrl('/');

		}


	}, err => {
		this.common.hideLoading()
		this.common.showErrorMessage(err.message)

	})

  }
}
