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




@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	ForgotForm: FormGroup;
	invalidLogin: boolean = false;
	user: any = {};
	forgot: any = {};
	logincheck: any;





	constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) {

	}

	goLogin() {
		this.router.navigateByUrl('/home/dashboard');

	}
	goForgot() {
		this.router.navigateByUrl('/ForgotPassword');

	}


	loginSubmit() {

		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		} else {
			this.common.showLoading()
			this.apiService.post(this.constantsService.login, this.user).subscribe((succ: any) => {
				console.log(succ.data, "datataa")
				if (succ.code == 200) {
					this.common.hideLoading()
					this.common.showSuccessMessage(succ.message)
					this.common.setUser(succ)
					this.router.navigateByUrl('/home/dashboard');
				}


				else {
					this.common.hideLoading()
					this.common.showErrorMessage(succ.message)
					this.router.navigateByUrl('/');

				}


			}, err => {
				this.common.hideLoading()
				this.common.showErrorMessage(err.message)
				// this.location.back();

			})

		}
	}
	ngOnInit() {

		this.loginForm = this.formBuilder.group({
			opEmailId: ['', Validators.compose([Validators.required])],
			opPassword: ['', Validators.required]
		});


		this.ForgotForm = this.formBuilder.group({
			opEmailId: ['', Validators.compose([Validators.required])],
		});
	}

	showForgot() {
		this.ForgotForm.reset()
		$('#forgotModal').modal('show')
	}



}
