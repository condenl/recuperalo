import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "~/app/shared/login.service";
import { Observable } from "rxjs";
import { RouteUtilsService } from "~/app/route/route-utils.service";
import { AppUserService } from "~/app/shared/app-user.service";

@Injectable({
    providedIn: "root"
})
export class BypassLoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private appUserService: AppUserService, private routeUtils: RouteUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.log("evaluating bypass-login-guard");
        
        return this.loginService.getCurrentUser()
            .then(user => this.appUserService.findByUid(user.uid))
            .then(appUser => {
                this.loginService.setCurrentId(appUser.id);
                this.routeUtils.routeTo("home", "slideTop");
                return false;
            })
            .catch(error => {
                console.log(`bypass-login-guard error: ${error}`);
                return true;
            });
    }
    
}