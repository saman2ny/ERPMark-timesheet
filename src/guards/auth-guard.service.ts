import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from 'src/service/common.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private commonService: CommonService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(route)
        var currentUser = this.commonService.getUser();
        // console.log(currentUser);
        // console.log(this.commonService.getUser())
        if (!currentUser || !currentUser.data.sessionValidMinutes) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/']);
            return false;
        } else if (currentUser.data.sessionValidMinutes) {
            // logged in so return true
            return true;
        }


    }
}
