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
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  LocalForm: FormGroup;
  localObj:any = {}
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { }

  ngOnInit(): void {
    datatblesandIts();

    this.LocalForm = this.formBuilder.group({
			defaultCountry: ['', Validators.compose([Validators.required])],
			dateFormat: ['', Validators.required],
			timezone: ['', Validators.required],
			defaultLanguage: ['', Validators.required],
			currencyCode: ['', Validators.required],
			currencySymbol: ['', Validators.required]
		});

  }


    Save(){
    if (this.LocalForm.invalid) {
			this.LocalForm.markAllAsTouched();
			return;
		} else {
      this.common.hideLoading()

    }
  }

}
