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
  timeSheets: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
    public constantsService: ConstantsService, private location: Location
  ) { }

  ngOnInit(): void {
    this.timeSheetList()
    datatblesandIts()
    this.Edit = false


    this.TimesheetForm = this.formBuilder.group({
      opProjectName: ['', Validators.compose([Validators.required])],
      opDate: ['', Validators.required],
      opHours: ['', Validators.required],
      opDesc: ['', Validators.required]
    });


    // Tasks List

    // this.apiService.post(this.constantsService.getListTaks, {}).subscribe((succ: any) => {
    //   this.listMainTasks = succ.data;

    // }, err => {

    // })










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


  openModal(check, listTasks) {
    if (check === "add") {
      this.Edit = false
      this.getNameForModel = "Add Work details"
    } else {
      this.getNameForModel = "Edit Work details";
      this.Edit = true
      //  Get Edit Call Employee
      console.log(listTasks, "listTasks")
      this.apiService.post(this.constantsService.getSingleTask, listTasks).subscribe((succ: any) => {
        this.timesheetModel = succ.data;


      }, err => {

      })

    }
    $("#todaywork").modal('show')
  }

  Save() {
    if (this.TimesheetForm.invalid) {
      this.TimesheetForm.markAllAsTouched();
      return;
    } else {
      this.common.hideLoading()
      console.log(this.timesheetModel, "Check timesheetModel")
      this.apiService.post(this.constantsService.saveTask, this.timesheetModel).subscribe((succ: any) => {
        if (succ.code == 200) {

          $("#todaywork").modal('hide')
          this.ngOnInit()

        }

      }, err => {

      })

    }
  }

}
