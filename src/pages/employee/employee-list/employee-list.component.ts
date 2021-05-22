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
	employeer: any = {}
	reqObj: any = {
		"moduleName": "employeer"
	}
	employeerList: any = []
	public minDate: any = new Date();
	public joinDate: any = new Date();
	user: any;
	menuType: any = {};
	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) {

		this.user = this.common.getUser();
		this.menuType = this.user.data[0]['select'];
	 }


	ngOnInit(): void {
		this.employeeList()
		datatblesandIts()


		this.EmployeerForm = this.formBuilder.group({
			opCompanyId: ['', Validators.required],
			opEmployeeId: ['', Validators.required],
			opRole: ['', Validators.required],
			opSelectBranch: ['', Validators.required],
			opFirstName: ['', Validators.compose([Validators.required])],
			opLastName: ['', Validators.required],
			opDateOfJoin: ['', Validators.required],
			opEmpDesg: ['', Validators.required],
			opGender: ['', Validators.required],
			opDateOfBirth: ['', Validators.required],
			opAddress: ['', Validators.required],
			opPhoneId: ['', Validators.required],
			opEmailId: ['', Validators.required],
			opPassword: ['', Validators.required],
			opConfirmPassword: ['', Validators.required],
			opPanNo: ['', Validators.required],
			opAadharNo: ['', Validators.required],
			opBankName: ['', Validators.required],
			opIFSC: ['', Validators.required],
			opAcctNo: ['', Validators.required],
			opPassport: ['', Validators.required],
			opTeamName: ['', Validators.required],
			opTeamId: ['', Validators.required],
			opEmpDepart: ['', Validators.required],
			opEmpDest: ['', Validators.required]


			// opUserName: ['', Validators.required],
		});

	}

	goEmployeerLogin() {

		if (this.EmployeerForm.invalid) {
			this.EmployeerForm.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
		}
	}

	employeeList() {
		this.common.showLoading()
		this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {
			console.log(succ.data, "datataa")
			if (succ.status === 200) {
				this.common.hideLoading()
				this.employeerList = succ.data
			}
			else {
				this.common.hideLoading()
				this.common.showErrorMessage(succ.message)

			}

		}, err => {
			this.common.hideLoading()
			this.common.showErrorMessage(err.message)

		})

	}
}
