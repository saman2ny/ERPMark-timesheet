import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';

import { ConstantsService } from 'src/service/constants.service';
import { SelectItem } from 'primeng/api';


declare function datatblesandIts(): any;



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})

export class TeamListComponent implements OnInit {

  

  listTeamId: any;
  teamObj: any = {
  }


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, public common: CommonService, private apiService: ApiService,
		public constantsService: ConstantsService, private location: Location
	) { 

  

  }

  ngOnInit(): void {
    datatblesandIts();
    this.apiService.post(this.constantsService.getCompanyMaster, {}).subscribe((succ: any) => {
      this.listTeamId = succ.data.languageMaster;

    });

  }

  goToDetail(){
    this.router.navigateByUrl('/home/allocate-team/team-detail');

  }

}
