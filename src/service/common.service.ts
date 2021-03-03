import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import * as $ from 'jquery'
// declare function myMethod(): any ;
import { Ng2IzitoastService } from 'ng2-izitoast'
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
  constructor(public router: Router, public iziToast: Ng2IzitoastService) {

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
    this.iziToast.show({ title: data, backgroundColor: "#52BE80", progressBarColor: "#717D7E", titleColor: "#FFFFFF", position: "topRight" });
  }

  showErrorMessage(data) {
    this.iziToast.show({ title: data, backgroundColor: "#E82929", progressBarColor: "#717D7E", titleColor: "#FFFFFF", position: "topRight" });

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


  downloadFile(file, fileName, fileFormat?) {
    var newBlob = new Blob([file], { type: file.type });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      if (fileFormat == 'pdf') {
       
        window.navigator.msSaveOrOpenBlob(newBlob,fileName + ".pdf");
      } else {
        window.navigator.msSaveOrOpenBlob(newBlob,fileName + ".xlsx");
  
      }
     
      return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    if (fileFormat == 'pdf') {
      link.download = fileName + ".pdf";

    } else {
      link.download = fileName + ".xlsx";

    }
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
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
  downloadDocs(file, fileName, fileFormat?) {
    console.log(file);  
    var newBlob = new Blob([file], { type: file.type });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download=fileName
    // if (fileFormat == 'pdf') {
    //   link.download = fileName + ".pdf";

    // } else {
    //   link.download = fileName + ".xlsx";

    // }
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
 
}
