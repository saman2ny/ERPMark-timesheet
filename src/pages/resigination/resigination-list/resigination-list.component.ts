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
  Resignationform: FormGroup;
  reqObj: any ={
	  "moduleName": "resigination"
  }
  title: any = {}
  user: any;
  resiginations: any = [];
  menuType: any = {};
resignationObj : any = {}
public minDate: any = new Date();

	public maxDate: any = new Date();


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { 

  }


	openModal(){
		this.title ="Add"
		this.preLoad()

		// $("#add_client").modal('show');
		$('#add_resignation').modal({
			backdrop: 'static',
			keyboard: false
		})

	}
	closeModal(){
		$("#add_resignation").modal('hide');
		this.Resignationform.reset();
		// this.preLoad()

}

editModal(resiginationList){
	this.title ="Edit"
	this.resignationObj = resiginationList
	$('#add_resignation').modal({
		backdrop: 'static',
		keyboard: false
	})
}





preLoad()
{
	this.user = this.common.getUser();

	this.menuType = this.user.data[0]['select'];
	this.resignationObj.opCompanyId = this.user.data[0]['companyid'];
	this.resignationObj.opEmployeeId = this.user.data[0]['employeeid'];
  this.resignationObj.opDepartment = this.user.data[0]['department'];
	this.resignationObj.opFirstname = this.user.data[0]['firstname'];
  this.resignationObj.opDesignation = this.user.data[0]['designation'];

  this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
		if (succ.status === 200) {
			this.common.hideLoading()


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
    this.resigination()
    datatblesandIts();


		this.Resignationform = this.formBuilder.group({
			opCompanyId: [''],
			opEmployeeId: [''],
			opNoticedate: [''],
			opResignationdate: [''],
			opFirstname: [''],
      opDepartment: [''],
      opDesignation: [''],
			opReason: ['']

		});



  }



	Resignationinsert() {

		if (this.Resignationform.invalid) {
			this.Resignationform.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.resignationObj, "resignationObj")
      // this.resignationObj.opReason = this.resignationObj.opReason.reason;


			this.apiService.post(this.constantsService.insertresignation, this.resignationObj).subscribe((succ: any) => {
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
