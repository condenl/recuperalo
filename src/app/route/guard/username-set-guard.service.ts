import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "~/app/shared/login.service";
import { Observable } from "rxjs";
import { RouteUtilsService } from "~/app/route/route-utils.service";
import { AppUserService } from "~/app/shared/app-user.service";
import { HomeActivityIndicatorService } from "~/app/shared/home-activity-indicator.service";
import { LoaderUtilsService } from "~/app/shared/loader-utils.service";
import { localize } from "nativescript-localize";

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
        
        return this.appUserService.findById(this.loginService.getCurrentId())
            .then(appUser => {
                if (appUser.username != null) {
                    return true;
                } else {
                    dialogs.alert({
                        title: localize("com.recuperalo.mobile.alert"),
                        message: localize("com.recuperalo.mobile.required.username"),
                        okButtonText: localize("com.recuperalo.mobile.continue")
                    }).then(() => {
                        this.loaderUtils.show();
                        this.homeActivityIndicatorService.notBusy();
                        this.routeUtils.routeTo("/profile", "slideTop");
                    });
                    return false;
                }
            });
    }
    
}