import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { Ng2IziToastModule } from 'ng2-izitoast'
import { ConstantsService } from 'src/service/constants.service';
import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
// import { ChangePasswordComponent } from 'src/pages/user/change-password/change-password.component';
import { BasicAuthInterceptor } from 'src/guards/BasicAuthInterceptor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { environment } from 'src/environments/environment';
import { CountryService } from 'src/service/country.service';



// import { CustomeTableFilterPipe } from './custome-table-filter.pipe';
// import { TemplateFilterPipe } from '../pipes/template-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    // ChangePasswordComponent,
    // CustomeTableFilterPipe,
    // TemplateFilterPipe,



    // ShowDatePipe


  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpModule, HttpClientModule, FormsModule, ReactiveFormsModule, Ng2IziToastModule,
    // PipesModule.forRoot()
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RecaptchaModule,
    RecaptchaFormsModule,

   

  ],
  providers: [CommonService, ApiService, ConstantsService, CountryService, SpeechRecognitionServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    },
  ],
  // exports:[ShowDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
