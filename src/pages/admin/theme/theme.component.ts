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
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  ThemeForm: FormGroup;
  theme: any ={}

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { }

  ngOnInit(): void {
    datatblesandIts();
    
    this.ThemeForm = this.formBuilder.group({
			websiteName: ['', Validators.compose([Validators.required])],
			lightLogo: ['', Validators.required],
			favicon: ['', Validators.required],
    })

  }
  goTheme(){
    
    if (this.ThemeForm.invalid) {
			this.ThemeForm.markAllAsTouched();
			return;
		} else {
      this.common.hideLoading()
    }
  }

}
