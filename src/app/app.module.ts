import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { ToastrModule } from 'ngx-toastr';

import { ConstantsService } from 'src/service/constants.service';
import { SpeechRecognitionServiceService } from 'src/service/speech-recognition-service.service';
// import { ChangePasswordComponent } from 'src/pages/user/change-password/change-password.component';
import { BasicAuthInterceptor } from 'src/guards/BasicAuthInterceptor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { environment } from 'src/environments/environment';



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
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClient, FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    // PipesModule.forRoot()
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [CommonService, ApiService, ConstantsService, SpeechRecognitionServiceService,
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
