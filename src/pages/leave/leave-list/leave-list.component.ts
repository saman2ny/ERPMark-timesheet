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
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  Leaveform: FormGroup;
	employeer: any = {}
  reqObj: any ={
	  "moduleName": "leaveStatus"
  }
  user: any;
  public minDate: any = new Date();
  
  leavecat: any = [];

  leaveLister: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { 
    this.user = this.common.getUser();
    this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
			if (succ.status === 200) {
				this.common.hideLoading()

				
        this.leavecat = succ.team
				this.employeer.opLeavetype = this.leavecat[0]
				
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
    this.leaveList()
    datatblesandIts();


		this.Leaveform = this.formBuilder.group({
			opCompanyId: ['', Validators.required],
			opEmployeeId: ['', Validators.required],
			opleavetype: ['', Validators.required],
      opDatestart: ['', Validators.required],
      opDateEnd: ['', Validators.required],
      opNodays: ['', Validators.required],
      opReason: ['', Validators.required]

		});
  }


  
	goLeaveinsert() {

		if (this.Leaveform.invalid) {
			this.Leaveform.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.employeer, "employeer")



			this.apiService.post(this.constantsService.insertleave, this.employeer).subscribe((succ: any) => {
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

  leaveList(){
    this.common.showLoading()
    this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {

      console.log(succ, "datataa")
      // console.log(succ.data, "datataa")
      if (succ.status === 200) {
        this.common.hideLoading()
        this.leaveLister = succ.data
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
