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
  selector: 'app-timesheet-records',
  templateUrl: './timesheet-records.component.html',
  styleUrls: ['./timesheet-records.component.css']
})
export class TimesheetRecordsComponent implements OnInit {
  listMainProjects: any = [];
  getNameForModel: any = {}
  TimesheetForm: FormGroup;
  timesheetModel: any = {}
  listMainTasks: any;
  Edit: boolean;
  reqObj: any = {
    "moduleName": "timeSheet"
  }
 timesheetObj: any = {}
  user: any;
	public minDate: any = new Date();
	title: any = {}
	public maxDate: any = new Date();
  timeSheets: any = [];
  menuType: any = {};
  projectlist: any = [];
  
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, private location: Location
  ) { }






  ngOnInit(): void {
    this.preLoad()
    this.timeSheetList()
    datatblesandIts()
    // this.Edit = false


    this.TimesheetForm = this.formBuilder.group({
      opCompanyId: [''],
      opEmployeeId: [''],
      opFirstname: [''],
      opProjectname: [''],
      opProjecthours: [''],
      opDescription: ['']

    });

  }


  openModal(){
		this.title ="Atimesheetdd"
		this.preLoad()

		// $("#add_client").modal('show');
		$('#addtimesheet').modal({
			backdrop: 'static',
			keyboard: false
		})

	}
	closeModal(){
		$("#addtimesheet").modal('hide');
		this.TimesheetForm.reset();
		// this.preLoad()

}



   
  timeSheetList() {
    this.common.showLoading()
    this.apiService.post(this.constantsService.employeerList, this.reqObj).subscribe((succ: any) => {

      console.log(succ, "datataa")
      if (succ.status === 200) {
        this.common.hideLoading()
        this.timeSheets = succ.data
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


  // openModal(check, listTasks) {
  //   if (check === "add") {
  //     this.Edit = false
  //     this.getNameForModel = "Add Work details"
  //   } else {
  //     this.getNameForModel = "Edit Work details";
  //     this.Edit = true
  //     //  Get Edit Call Employee
  //     console.log(listTasks, "listTasks")
  //     this.apiService.post(this.constantsService.getSingleTask, listTasks).subscribe((succ: any) => {
  //       this.timesheetModel = succ.data;


  //     }, err => {

  //     })

  //   }
  //   $("#todaywork").modal('show')
  // }



  preLoad()
  {
    this.user = this.common.getUser();
  
    this.menuType = this.user.data[0]['select'];
    this.timesheetObj.opCompanyId = this.user.data[0]['companyid'];
    this.timesheetObj.opEmployeeId = this.user.data[0]['employeeid'];
    this.timesheetObj.opFirstname = this.user.data[0]['firstname'];
    this.apiService.post(this.constantsService.rolesList, {}).subscribe((succ: any) => {
      if (succ.status === 200) {
        this.common.hideLoading()
  
  
        this.projectlist = succ.projectlist
        this.timesheetObj.opProjectname = this.timesheetObj[0]

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





  Timesheetinsert() {

		if (this.TimesheetForm.invalid) {
			this.TimesheetForm.markAllAsTouched();
			return;
		} else {
			this.common.hideLoading()
			console.log(this.timesheetObj, "timesheetObj")

						// Leave
            // this.timesheetObj.opProjectname = this.timesheetObj.opProjectname.projectname;


			this.apiService.post(this.constantsService.inserttimesheetdata, this.timesheetObj).subscribe((succ: any) => {
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

}
