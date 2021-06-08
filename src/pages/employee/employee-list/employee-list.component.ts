import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { CountryService } from 'src/service/country.service';
import { BankService } from 'src/service/bank.service';
import { CountriesService } from 'src/service/countries.service';

// import * as $ from 'jquery'
declare var $: any;
declare function datatblesandIts(): any;



@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	EmployeeeForm: FormGroup;
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
	allCountries: any = [];
	// all details
	departmentList: any = [];
	roleList: any = [];
	branchList: any =[]
	designationList: any []
	teamList: any [];
	title: any = {};

	isUniqueUserId: boolean = true;


	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location, public countryService: CountryService, public BankService:BankService, private CountriesService:CountriesService
	) {

		this.user = this.common.getUser();
		this.menuType = this.user.data[0]['select'];
		this.employeer.opCompanyId = this.user.data[0]['companyid'];
		this.employeer.opEmployeeId = this.user.data[0]['employeeid'];

		// telephone
		this.allCounties = this.countryService.allCountries;
		this.CountryISO = this.countryService.getcountryCode();
		// Banks
		this.allBanks = this.BankService.getcodeBank();
		this.employeer.opBankName = this.allBanks[0];
		// country
		this.allCountries = this.CountriesService.countries;
		this.employeer.opCountry = this.allCountries[0];
		// Department
		this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
			console.log(succ.department, "department")
			if (succ.status === 200) {
				this.common.hideLoading()


				this.departmentList = succ.department
				this.employeer.opEmpDepart = this.departmentList[0]

				this.roleList = succ.role
				this.employeer.opRole = this.roleList[0]

				this.branchList = succ.branch
				this.employeer.opSelectBranch = this.branchList[0]

				this.designationList = succ.designation
				this.employeer.opEmpDesg = this.designationList[0]

				this.teamList = succ.team
				this.employeer.opTeamName = this.teamList[0]
				
			}
			else {
				this.common.hideLoading()
				this.common.showErrorMessage(succ.message)

			}

		}, err => {
			this.common.hideLoading()
			this.common.showErrorMessage(err.message)

		})





		// console.log(this.allBanks)



	 }



	ngOnInit(): void {
		this.employeeList()
		datatblesandIts()
		this.title ="Add"



		this.EmployeeeForm = this.formBuilder.group({
			opCompanyId: ['', Validators.required],
			opEmployeeId: ['', Validators.required],
			opRole: [''],
			opSelectBranch: [''],
			opFirstName: ['', Validators.compose([Validators.required])],
			opLastName: [''],
			opDateOfJoin: ['', Validators.required],
			opEmpDesg: ['', Validators.required],
			opGender: ['', Validators.required],
			opDateOfBirth: ['', Validators.required],
			opAddress: ['', Validators.required],
			opCountry: ['', Validators.required],
			opPhoneId: ['', Validators.required],
			opEmailId: ['', Validators.required],
			opPassword: ['', Validators.required],
			opConfirmPassword: ['', Validators.required],
			opPanNo: ['', Validators.required],
			opAadharNo: [''],
			opBankName: ['', Validators.required],
			opIFSC: [''],
			opAcctNo: ['', Validators.required],
			opPassport: ['', Validators.required],
			opTeamName: ['', Validators.required],
			// opTeamId: ['', Validators.required],
			opEmpDepart: ['', Validators.required],
			opEmpImgDisplay: [''],
			opEmpImg: ['', Validators.required]


			// opUserName: ['', Validators.required],
		});

	}

	openModal(){
		this.title ="Add"

		// $("#add_client").modal('show');
		$('#add_client').modal({
			backdrop: 'static',
			keyboard: false
		})
	}

	editModal(employeee){
		this.title ="Edit"
		this.employeer = employeee
		$('#add_client').modal({
			backdrop: 'static',
			keyboard: false
		})
	}

	
	// already exists email
	focusOutEmailId($event) {
	 
		const userId = $event.target.value
    if (!userId) {
      return;

    }
    
    this.apiService.post(this.constantsService.validateUserId, { opUserId: userId, "isEdit":  "false" }).subscribe((succ: any) => {
      
      
      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.EmployeeeForm.get('opEmailId').setValidators([this.validateUserIdUnique()])
        this.EmployeeeForm.get('opEmailId').updateValueAndValidity();
      } else {
        let val = this.validateUserIdUnique;
        
        this.isUniqueUserId = false;
        this.EmployeeeForm.get('opEmailId').setValidators([this.validateUserIdUnique()])
        this.EmployeeeForm.get('opEmailId').updateValueAndValidity();
      }
    });

	}

	private validateUserIdUnique(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
		  if (this.isUniqueUserId != false) {
			return null
		  }
		  return { 'alreadyExist': true }
		}
	  }
	// image base64
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
			this.employeer.opEmpImg = this.employeer.attachmentFile

	
		  })
	
		//   setTimeout(() => {
		// 	this.employeer.opEmpImg = this.employeer.attachmentFile
		//   console.log(this.employeer.attachmentFile, "this.employeer.attachmentFile")
		//   console.log(this.employeer.opEmpImg, "this.employeer.attach")
		//   console.log(this.employeer.attachmentFileName, "this.employeer.attachmentFileName")
		// }, 2000);

		}
	}
	goEmployeerLogin() {

		if (this.EmployeeeForm.invalid) {
			this.EmployeeeForm.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.employeer, "employeer")


			// Joining Mobile with dial code
			var opMobileNo = this.EmployeeeForm.get('opPhoneId').value
			this.employeer.opPhoneId = this.common.convertCompleteCountryCode(opMobileNo)
			// roles
    		this.employeer.opRole = this.employeer.opRole.roleId;
			// Branch
    		this.employeer.opSelectBranch = this.employeer.opSelectBranch.branchid;
			// Desigination
    		this.employeer.opEmpDesg = this.employeer.opEmpDesg.designationId;
			// Department
			this.employeer.opEmpDepart = this.employeer.opEmpDepart.departmentId;
			// Teams
			this.employeer.opTeamName = this.employeer.opTeamName.teamId;

			this.apiService.post(this.constantsService.insertemployee, this.employeer).subscribe((succ: any) => {
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
				// this.employeer.opCompanyId = "CMP10001";

				this.employeerList = succ.data
				this.employeer.opEmployeeId = succ.empid['maxCEId']

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
