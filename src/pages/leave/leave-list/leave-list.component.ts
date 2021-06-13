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
	Leaveform: FormGroup;
	leaveObj: any = {}
	reqObj: any = {
		"moduleName": "leaveStatus"
	}
	user: any;
	public minDate: any = new Date();

	public maxDate: any = new Date();

	leavecat: any = [];

	leaveLister: any = [];
	menuType: any = {};
	title: any = {}

	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) {

	}

	openModal(){
		this.title ="Add"
		this.preLoad()

		// $("#add_client").modal('show');
		$('#add_leave').modal({
			backdrop: 'static',
			keyboard: false
		})

	}
	closeModal(){
		$("#add_leave").modal('hide');
		this.Leaveform.reset();
		// this.preLoad()

}

editModal(leaveList){
	this.title ="Edit"
	this.leaveObj = leaveList
	$('#add_leave').modal({
		backdrop: 'static',
		keyboard: false
	})
}

preLoad()
{
	this.user = this.common.getUser();

	this.menuType = this.user.data[0]['select'];
	this.leaveObj.opCompanyId = this.user.data[0]['companyid'];
	this.leaveObj.opEmployeeId = this.user.data[0]['employeeid'];
	this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
		if (succ.status === 200) {
			this.common.hideLoading()


			this.leavecat = succ.leavecat
			this.leaveObj.opleavetype = this.leavecat[0]

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
ngOnInit(): void {
		this.preLoad()
		this.leaveList()
		datatblesandIts();


		this.Leaveform = this.formBuilder.group({
			opCompanyId: [''],
			opEmployeeId: [''],
			opleavetype: [''],
			opDatestart: [''],
			opDateEnd: [''],
			opNodays: [''],
			opReason: ['']

		});
	}



	goLeaveinsert() {

		if (this.Leaveform.invalid) {
			this.Leaveform.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.leaveObj, "leaveObj")

						// Leave
						this.leaveObj.opleavetype = this.leaveObj.opleavetype.leavetype;


			this.apiService.post(this.constantsService.insertleave, this.leaveObj).subscribe((succ: any) => {
				if (succ.status === 200) {
					this.common.hideLoading()
					this.common.showSuccessMessage(succ.message);
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

	leaveList() {
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
