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
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  RoleForm: FormGroup;
  roleObj:any = {}
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	)  { }

  ngOnInit(): void {
    datatblesandIts();
    this.RoleForm = this.formBuilder.group({
			addRole: ['', Validators.compose([Validators.required])]
    })
  }

  openModal(){
    $("#add_role").modal('show');
  }

  deleteModal(){
    $("#delete_role").modal('show');

  }

}
