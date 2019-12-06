import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "~/app/shared/login.service";
import { Observable } from "rxjs";
import { RouteUtilsService } from "~/app/route/route-utils.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private routeUtils: RouteUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.log("evaluating auth-guard");
        if (!this.loginService.getCurrentId()) {
            this.loginService.logOut();
            this.routeUtils.routeTo("login", "slideBottom");
            return false;
        }
        return true;
    }
    
}