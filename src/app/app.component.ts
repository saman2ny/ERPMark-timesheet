import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ApiService } from '../service/api.service';
import { ConstantsService } from 'src/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Subscription } from 'rxjs/Subscription';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ForgotForm: FormGroup;
  forgot: any = {};
  passwordForm: FormGroup;
  changePasswordObj: any = {};
  token: any;
  private paramsSubscription: Subscription;
  message: any;

  resolved(captchaResponse: string) {
    
  }




  constructor(public formBuilder: FormBuilder, public common: CommonService, public apiService: ApiService, public constantsService: ConstantsService,
    public activateRoute: ActivatedRoute
  ) {
  
    
    this.ForgotForm = this.formBuilder.group({
      opEmailId: ['', Validators.compose([Validators.required])],
      recaptcha: ['', Validators.compose([Validators.required])]
    });
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],

    });
    
}
}