import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstantsService } from 'src/service/constants.service';
import { ApiService } from 'src/service/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

declare var $: any;
declare function sideMenuFunction(): any;
declare function myMethod(): any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
 
  user: any;
  menuType: any = {};
  menus: any = []
  firstname: any ={}
  constructor(public common: CommonService, public formBuilder: FormBuilder, public apiService: ApiService, public constantsService: ConstantsService, public router: Router) {
    
   
  }
  ngOnInit() {


    myMethod();
    this.user = this.common.getUser();
    this.menuType = this.user.data[0]['select'];
    this.firstname = this.user.data[0]['firstname'];
    this.menus = this.user.menu;
    console.log(this.user, "this.menuType")
}

goTo(mainPages){
  this.router.navigate([mainPages.route_path])
}

logout(){
  this.common.logout()
}
}

