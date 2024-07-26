import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import * as $ from 'jquery'
// declare function myMethod(): any ;
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user: any;
 
  loginCred: any;
  tempId: any;
  mainPages: any;
  headersDetails: any;
  companyy: any;
  category:any;
  logFiles: any;
  branch: any;
  sessionValidMinutes=0;
  tempChannels: any;
  repost: any;
  operators: any;
  customers: any;
  language: any;
  UserDetailEncryption: any="sd";
  defaultCountryCode:any = ""
  constructor(public router: Router, public toastr: ToastrService) {

    this.user = sessionStorage.user;


  }


  setLogin(loginCred) {
    this.loginCred = loginCred;
  }
  getLogin() {
    return this.loginCred;

  }

  setUser(user) {
    // sessionStorage.user = JSON.stringify(user)
    this.user = user;

  }
  getUser() {

    return this.user;
  }
  
  
  showSuccessMessage(data) {
    this.toastr.success(data);
  }

  showErrorMessage(data) {
    this.toastr.error(data)
  }

  b4Update(){
    return "Update is applicable only if changes are made"
  }

  logout(data?) {

    sessionStorage.clear();
    this.setUser({});
    this.hideLoading();
    this.router.navigate(['/']);


  }


  showLoading(): void {
    $("#loading").show();
  }

  hideLoading(): void {
    $("#loading").hide();
  }
  // convert base 64
  convertBase64(file, result) {
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      result(String(myReader.result));
    }
    myReader.readAsDataURL(file);
  }
  getCompleteNo(pre, post) {
    var CompleteMobileNumberRough;
    if (pre)
      CompleteMobileNumberRough = _.concat(pre + "-" + post);
    else
      CompleteMobileNumberRough = post
    var CompleteMobileNumber = CompleteMobileNumberRough.toString();
    post = CompleteMobileNumber;
    return post;
  }
  splitNo(mobileNO) {
    var obj: any = {};
    if (!mobileNO.includes("-")) {
      obj.preMobileNo = "00";
      obj.postMobileNo = mobileNO;
      return obj;
    }
    var mobile = _.split(mobileNO, '-', 2);

    obj.preMobileNo = mobile[0]
    obj.postMobileNo = mobile[1]
    return obj;
  }



  scheduledTimeFormat(those) {
    // console.log(those, "Date Check Format")
    // var dateTime: any = new Date(those);
    // dateTime = moment(dateTime).format("YYYY-MM-DD");
    // console.log(dateTime, "Date Check Format final")
    // return dateTime;


    const utcDate = moment.utc(those);
    var utcDate2 = new Date(utcDate.format());
    var dateTime = moment(utcDate2).format("YYYY-MM-DD");
    return dateTime;
  }

  convertToDatePickerTime(date) {

    let utcDate = moment(date, 'dd-mm-yyyy hh:mm:ss');
    console.log(utcDate);
    return utcDate.local().format("dd-mm-yyyy hh:mm:ss")

    // return moment(date, 'dd-mm-yyyy hh:mm:ss').format()
  }
  convertCompleteCountryCode(data) {
    data.number = data.number.replace(/-/g, "")
    let cPhone = data.dialCode + "-" + data.number;
    cPhone = cPhone.replace(/ /g, "");

    return cPhone.split("+")[1];
  }
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  getAddTimezone(time,zone){

    var getZones = zone
    var getTimes = time
    var getTimesFinal = getTimes.toString();
    var consolew = getTimesFinal.substr(0, 25)
    console.log(consolew, "console")

    var datiDup = new Date(consolew + getZones);
    var BefConfr = datiDup.toString()
    var finalDate = BefConfr.substr(0, 25)

    return new Date(finalDate);

  }

}
