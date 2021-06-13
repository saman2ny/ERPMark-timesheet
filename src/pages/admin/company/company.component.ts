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
import { CountriesService } from 'src/service/countries.service';


declare var $: any;
declare function datatblesandIts(): any;


@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
	CompanyForm: FormGroup;
	companyObj: any = {}
	public minDate: any = new Date();
	user: any;
	menuType: any = {};
	allCounties: ((string | number | string[])[] | (string | number | number[])[])[];
	CountryISO: any = [];
	allCountries: any = [];
	allBanks: any = []
	selectedCorpPreMobileNo = this.common.defaultCountryCode
	isUniqueUserId: boolean = true;
	title: string;
	companyList:any = []

	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location, public countryService: CountryService, public BankService: BankService, private CountriesService: CountriesService
	) {
		this.plugins()
		this.companyList = [
			{"firstname": "sam", "lastname":"antony", "designation":"senior analyst developer"},
			{"firstname": "xy", "lastname":"z", "designation":"senior analyst developer"},
			{"firstname": "ab", "lastname":"c", "designation":"senior analyst developer"},
		]
	}


	plugins() {

		this.user = this.common.getUser();
		this.menuType = this.user.data[0]['select'];
		this.companyObj.opCompanyId = this.user.data[0]['companyid'];
		this.companyObj.opEmployeeId = this.user.data[0]['employeeid'];

		// telephone
		this.allCounties = this.countryService.allCountries;
		this.CountryISO = this.countryService.getcountryCode();
		// Banks
		this.allBanks = this.BankService.getcodeBank();
		this.companyObj.opBankName = this.allBanks[0];
		// country
		this.allCountries = this.CountriesService.countries;
		this.companyObj.opCountry = this.allCountries[0];




	}

	ngOnInit(): void {
		datatblesandIts();


		this.CompanyForm = this.formBuilder.group({
			firstName: ['', Validators.compose([Validators.required])],
			lastPerson: ['', Validators.compose([Validators.required])],
			birthDate: ['', Validators.compose([Validators.required])],
			gender: ['', Validators.compose([Validators.required])],


			companyName: ['', Validators.compose([Validators.required])],
			contactPerson: ['', Validators.required],
			address: ['', Validators.required],
			country: ['', Validators.required],

			email: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			mobileNumber: ['', Validators.required],
			numberOfUsers: ['', Validators.required],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
			confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],

		});
	}



	openModal() {
		this.title = "Add"
		this.plugins()
		$('#add_company').modal({
			backdrop: 'static',
			keyboard: false
		})
	}

	closeModal() {
		$("#add_company").modal('hide');
		this.CompanyForm.reset();

	}

	editModal(employeee)
		{
			this.title ="Edit"
			$('#add_company').modal({
				backdrop: 'static',
				keyboard: false
			})
		}

		Edit(){
			if (this.CompanyForm.invalid) {
				this.CompanyForm.markAllAsTouched();
				return;
			} else {
				this.common.hideLoading()
	
			}
		}


	Save() {
		if (this.CompanyForm.invalid) {
			this.CompanyForm.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()

		}
	}

}
