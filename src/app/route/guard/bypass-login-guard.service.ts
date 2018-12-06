import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "~/app/shared/login.service";
import { Observable } from "rxjs";
import { RouteUtilsService } from "~/app/route/route-utils.service";

@Injectable({
    providedIn: "root"
})
export class BypassLoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private routeUtils: RouteUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        //TODO review how it works on real devices
        console.log("evaluating bypass-login-guard");
        if (this.loginService.getCurrentUid()) {
            this.routeUtils.routeTo("home", "slideTop");
            return false;
        }
        return true;
    }
    
}