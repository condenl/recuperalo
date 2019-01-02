import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "~/app/shared/login.service";
import { Observable } from "rxjs";
import { RouteUtilsService } from "~/app/route/route-utils.service";
import { AppUserService } from "~/app/shared/app-user.service";
import { HomeActivityIndicatorService } from "~/app/shared/home-activity-indicator.service";
import { LoaderUtilsService } from "~/app/shared/loader-utils.service";

var dialogs = require("tns-core-modules/ui/dialogs");

@Injectable({
    providedIn: "root"
})
export class UsernameSetGuard implements CanActivate {

    constructor(private loginService: LoginService, private appUserService: AppUserService, 
        private homeActivityIndicatorService: HomeActivityIndicatorService, private routeUtils: RouteUtilsService,
        private loaderUtils: LoaderUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log("evaluating username-set-guard");
        
        return this.appUserService.findById(this.loginService.getCurrentUid())
            .then(appUser => {
                if (appUser[Object.keys(appUser)[0]].username != null) {
                    return true;
                } else {
                    dialogs.alert({
                        title: "Alert",
                        message: "You should have a username",
                        okButtonText: "Continue"
                    }).then(() => {
                        this.loaderUtils.show();
                        this.homeActivityIndicatorService.notBusy();
                        this.routeUtils.routeTo("/profile");
                    });
                    return false;
                }
            });
    }
    
}