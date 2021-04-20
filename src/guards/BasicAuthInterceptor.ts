import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConstantsService } from '../service/constants.service';
import { CommonService } from '../service/common.service';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    interval: any;
 
    constructor(public router: Router, public common: CommonService, public constantsService: ConstantsService, public commonService: CommonService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        // add authorization header with basic auth credentials if available

        
        let url = request.url;

       

        return next.handle(request).pipe(
            // We use the map operator to change the data from the response
            map(resp => {
                // Several HTTP events go through that Observable 
                // so we make sure that this is a HTTP response
                if (resp instanceof HttpResponse) {
                    // Just like for request, we create a clone of the response
                    // and make changes to it, then return that clone     
                    
                    if (resp.body.code == 408) {
                        // if (this.interval) {
                        //     clearInterval(this.interval);
                        // }
                        this.commonService.showErrorMessage(resp.body.message);
                        this.commonService.logout(resp.body);
                        // location.reload();
                        return;
                    }
                    let url = resp.url;
                    if (url.endsWith(this.constantsService.login) || url.endsWith(this.constantsService.validateLogin)) {
                        if (resp.body.code == 200) {
                            this.common.sessionValidMinutes = resp.body.data.sessionValidMinutes * 60000;
                            // this.common.sessionValidMinutes = 10000;
                            
                        }
                    } else {
                        
                        // if (this.interval) {
                        //     clearInterval(this.interval);
                        // }

                        // this.interval = setInterval(() => {
                        //     // alert("session logout");
                        //     this.commonService.showErrorMessage("session time out");
                        //     this.commonService.logout(resp.body);
                       
                        //     clearInterval(this.interval);
                        // }, this.common.sessionValidMinutes)
                    }

                    return resp.clone();
                }
            }))

    }

    encryptionOf(msg) {
        var encrptMsg = '';
        var i;
        var j;
        var EN_FROM_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", "#", "$", "-", "+", "_", ".", "@", "&", "!"];
        var EN_TO_KEYS = ["p", "q", "r", "s", "t", "k", "l", "m", "n", "o", "a", "b", "c", "d", "e", "u", "v", "w", "x", "y", "z", "f", "g", "h", "i", "j", "H", "I", "J", "K", "L", "M", "X", "Y", "Z", "E", "F", "G", "N", "O", "P", "Q", "R", "A", "B", "C", "D", "S", "T", "U", "V", "W", "9", "6", "1", "7", "8", "2", "0", "4", "5", "=", "3", ".", "!", "-", "@", "_", "$", "#", "+", "&"];
        for (i = 0; i < msg.length; i++) {
            var ch = msg.charAt(i);
            for (j = 0; j < EN_FROM_KEYS.length; j++)
                if (ch == EN_FROM_KEYS[j]) {
                    ch = EN_TO_KEYS[j];
                    break;
                }
            encrptMsg += ch;
        }
        encrptMsg = this.makeid() + encrptMsg + this.makeid();
        return encrptMsg;
    }



    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    clean(obj) {
        for (var propName in obj) {

            if (obj[propName] === null || obj[propName] === "" || obj[propName] === undefined || obj[propName] === 0) {
                delete obj[propName];
            }
        }
        return obj
    }



}