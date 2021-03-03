import { Component, OnInit, OnDestroy, NgZone, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { CommonService } from 'src/service/common.service';
import { ApiService } from '../../../service/api.service';
import { ConstantsService } from '../../../service/constants.service';

import * as moment from 'moment';
declare var $: any;


export interface CalendarDate {

  mDate: moment.Moment;

  selected?: boolean;

  today?: boolean;
  count: number;
  promoCount: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, public location: Location, private zone: NgZone) {



    

  }






  ngOnInit() {
    this.user = this.common.getUser()
  }
}