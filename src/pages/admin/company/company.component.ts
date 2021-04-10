import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';

declare var $: any;
declare function datatblesandIts(): any;


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  CompanyForm: FormGroup;
  companyObj:any = {}
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { }

  ngOnInit(): void {
    datatblesandIts();

        
    this.CompanyForm = this.formBuilder.group({
			companyName: ['', Validators.compose([Validators.required])],
			contactPerson: ['', Validators.required],
			address: ['', Validators.required],
			country: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			postalCode: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			mobileNumber: ['', Validators.required],
			numberOfUsers: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
			website: [''],
		});
  }


  Save(){
    if (this.CompanyForm.invalid) {
			this.CompanyForm.markAllAsTouched();
			return;
		} else {
      this.common.hideLoading()

    }
  }

}
