import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import { BankService } from 'src/service/bank.service';

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
	allBanks: any =[]
	public minDate: any = new Date();
	public joinDate: any = new Date();
	user: any;
	menuType: any = {};


	allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
	CountryISO: any = [];

	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location, public countryService: CountryService, public BankService:BankService
	) {

		this.user = this.common.getUser();
		this.menuType = this.user.data[0]['select'];
		this.allCounties = this.countryService.allCountries;
		this.CountryISO = this.countryService.getcountryCode();
		this.allBanks = this.BankService.getcodeBank();
		this.employeer.opBankName = this.allBanks[0];


		// console.log(this.allBanks)



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
			opLastName: [''],
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
			opEmpDest: ['', Validators.required],
			opEmpImgDisplay: [''],
			opEmpImg: ['', Validators.required]


			// opUserName: ['', Validators.required],
		});

	}

	openModal(){
		// $("#add_client").modal('show');
		$('#add_client').modal({
			backdrop: 'static',
			keyboard: false
		})
	}
	getEmployeerImg(event){
		var file: File = event.target.files[0];
		var fileFormat = file.name.substring(file.name.lastIndexOf("."), file.name.length);
	
		if (event.target.files.length > 0) {
		  const file = event.target.files[0];
		  console.log(file, "file")
	
		  this.common.convertBase64(file, (result) => {
			this.employeer.attachmentFile = result;
			this.employeer.attach = file.name;
			this.employeer.attachmentFileName = file.name;
	
		  })
	
		  setTimeout(() => {
			this.employeer.opEmpImg = this.employeer.attachmentFile
		  console.log(this.employeer.attachmentFile, "this.employeer.attachmentFile")
		  console.log(this.employeer.opEmpImg, "this.employeer.attach")
		  console.log(this.employeer.attachmentFileName, "this.employeer.attachmentFileName")
		}, 2000);

		}
	}
	goEmployeerLogin() {

		if (this.EmployeerForm.invalid) {
			this.EmployeerForm.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.employeer, "employeer")
			// Joining Mobile with dial code
			var opMobileNo = this.EmployeerForm.get('opPhoneId').value
			this.employeer.opPhoneId = this.common.convertCompleteCountryCode(opMobileNo)


			this.apiService.post(this.constantsService.employeerList, this.employeer).subscribe((succ: any) => {
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
