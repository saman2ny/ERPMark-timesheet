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
import * as _ from 'lodash';



@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	EmployeeeForm: FormGroup;
	employeer: any = {}
	reqObj: any = {
		"moduleName": "employee"
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
	selectedCorpPreMobileNo =  this.common.defaultCountryCode

	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location, public countryService: CountryService, public BankService:BankService, private CountriesService:CountriesService
	) {

		this.plugins()
	

	 }


	 plugins(){
		 
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
			// this.employeer.opTeamName = this.teamList[0]
			
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
			opCompanyId: [''],
			opEmployeeId: [''],
			opRole: [''],
			opSelectBranch: [''],
			opFirstName: ['', Validators.compose([Validators.required])],
			opLastName: [''],
			opDateOfJoin: [''],
			opEmpDesg: [''],
			opGender: [''],
			opDateOfBirth: [''],
			opAddress: [''],
			opCountry: [''],
			opPhoneId: [''],
			opEmailId: ['', Validators.required],
			opPassword: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
			opConfirmPassword: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
			opPanNo: [''],
			opAadharNo: [''],
			opBankName: [''],
			opIFSC: [''],
			opAcctNo: [''],
			opPassport: [''],
			opTeamName: ['', Validators.required],
			// opTeamId: [''],
			opEmpDepart: [''],
			opEmpImg: ['']


			// opUserName: [''],
		});

	}

	openModal(){
		this.title ="Add"
this.plugins()
		// $("#add_client").modal('show');
		$('#add_client').modal({
			backdrop: 'static',
			keyboard: false
		})
	}


	closeModal(){
				$("#add_client").modal('hide');
				this.EmployeeeForm.reset();

	}
	editModal(employeee){
		this.title ="Edit"
		console.log(employeee, "employeee")
				this.employeer.opCompanyId = employeee.companyname
				this.employeer.opEmployeeId = employeee.employeeid
		
				this.employeer.opFirstName = employeee.firstname
				this.employeer.opLastName = employeee.lastname
				this.employeer.opDateOfJoin = employeee.joiningdate
				this.employeer.opGender = employeee.gender
				this.employeer.opDateOfBirth = employeee.birthday
				this.employeer.opAddress = employeee.address

				this.employeer.opPhoneId = employeee.mobilenumber
				var mobile = _.split(this.employeer.opPhoneId, '-', 2);
				this.employeer.opPreMobileNo = mobile[0]
				this.employeer.opPostMobileNo = mobile[1]
	
				var mobile = _.split(this.employeer.opPhoneId, '-', 2);
	
				this.EmployeeeForm.controls.opPhoneId.setValue(mobile[1]);
	
				let countryCode: any = this.allCounties.filter(element => {
					return element[2] == mobile[0];
				  });
				  countryCode = countryCode[0]
				// this.CountryISO = countryCode[0]
				  this.selectedCorpPreMobileNo = countryCode[1];


				this.employeer.opEmailId = employeee.emailaddress
				this.employeer.opPassword = employeee.password
				this.employeer.opConfirmPassword = employeee.password
				this.employeer.opPanNo = employeee.panno
				this.employeer.opAadharNo = employeee.aadharno
				this.employeer.opIFSC = employeee.ifsc
				this.employeer.opAcctNo = employeee.accountnumber
				this.employeer.opPassport = employeee.visaexpirydate
				this.employeer.opEmpImg = employeee.empimg


				this.employeer.opRole = employeee.role
				this.employeer.opSelectBranch = employeee.selectbranch
				this.employeer.opEmpDesg = employeee.designation
				this.employeer.opCountry = employeee.country
				this.employeer.opBankName = employeee.bankname
				// this.employeer.opTeamName = employeee.teamname
				this.employeer.opEmpDepart = employeee.department

				setTimeout(() => {


					this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
						console.log(succ.department, "department")
						if (succ.status === 200) {
							this.common.hideLoading()
				
				
							this.departmentList = succ.department
							// this.employeer.opEmpDepart = this.departmentList[0]
							this.employeer.opEmpDepart = this.departmentList.filter(element => {
								return element.department == this.employeer.opEmpDepart;
							  });
							  this.employeer.opEmpDepart = this.employeer.opEmpDepart[0];
				
							this.roleList = succ.role
								// this.employeer.opRole = this.roleList[0]
							this.employeer.opRole = this.roleList.filter(element => {
								return element.role == this.employeer.opRole;
							  });
							  this.employeer.opRole = this.employeer.opRole[0];
				
							this.branchList = succ.branch
								// this.employeer.opSelectBranch = this.branchList[0]
							this.employeer.opSelectBranch = this.branchList.filter(element => {
								return element.branch == this.employeer.opSelectBranch;
							  });
							  this.employeer.opSelectBranch = this.employeer.opSelectBranch[0];
				
							this.designationList = succ.designation
								// this.employeer.opEmpDesg = this.designationList[0]
							this.employeer.opEmpDesg = this.designationList.filter(element => {
								return element.branch == this.employeer.opEmpDesg;
							  });
							  this.employeer.opEmpDesg = this.employeer.opEmpDesg[0];
				
							// this.teamList = succ.team
							// this.employeer.opTeamName = this.designationList.filter(element => {
							// 	return element.teamname == this.employeer.opTeamName;
							//   });
							//   this.employeer.opTeamName = this.employeer.opTeamName[0];
							
						}
						else {
							this.common.hideLoading()
							this.common.showErrorMessage(succ.message)
				
						}
				
					}, err => {
						this.common.hideLoading()
						this.common.showErrorMessage(err.message)
				
					})
					
			
					  
			
			}, 1500);




		// this.employeer = employeee
		$('#add_client').modal({
			backdrop: 'static',
			keyboard: false
		})
	}

	
	// already exists email
	focusOutEmailId($event) {
	 
		const userId = $event.target.value
    if (!userId) {
      return { 'required': true }
    }
    
    this.apiService.post(this.constantsService.validateEmail, { emailid: userId }).subscribe((succ: any) => {
      
      
      if (succ.code == 200) {
        this.isUniqueUserId = true;
        this.EmployeeeForm.get('empEmailId').setValidators([this.validateUserIdUnique()])
        this.EmployeeeForm.get('empEmailId').updateValueAndValidity();
      } else {        
        this.isUniqueUserId = false;
        this.EmployeeeForm.get('empEmailId').setValidators([this.validateUserIdUnique()])
        this.EmployeeeForm.get('empEmailId').updateValueAndValidity();
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
		//   console.log(file, "file")
	
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

	EditEmployeerLogin()
{
	if (this.EmployeeeForm.invalid) {
		this.EmployeeeForm.markAllAsTouched();
		this.plugins()
		return;
	} else {
		this.common.hideLoading()
			console.log(this.employeer, "employeer")

	}
}	goEmployeerLogin() {

		if (this.EmployeeeForm.invalid) {
			this.EmployeeeForm.markAllAsTouched();
			this.plugins()
			return;
		} else {
			this.common.hideLoading()
			console.log(this.employeer, "employeer")


			// Joining Mobile with dial code
			var opMobileNo = this.EmployeeeForm.get('opPhoneId').value
			this.employeer.opPhoneId = this.common.convertCompleteCountryCode(opMobileNo)
			// opBankName
    		this.employeer.opBankName = this.employeer.opBankName.keys;
			// country
    		this.employeer.opCountry = this.employeer.opCountry.code;
			// roles
    		this.employeer.opRole = this.employeer.opRole.role;
			// Branch
    		this.employeer.opSelectBranch = this.employeer.opSelectBranch.branch;
			// Desigination
    		this.employeer.opEmpDesg = this.employeer.opEmpDesg.designation;
			// Department
			this.employeer.opEmpDepart = this.employeer.opEmpDepart.department;
			// Teams
			this.employeer.opTeamName = this.employeer.opTeamName.teamname;

			this.apiService.post(this.constantsService.insertemployee, this.employeer).subscribe((succ: any) => {
				if (succ.code === 200) {
					this.common.hideLoading()
					this.common.showSuccessMessage(succ.message);
					this.closeModal()
					this.ngOnInit()
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
