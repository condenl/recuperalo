import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { LostObjectService } from '~/app/shared/lost-object.service';

@Injectable({
    providedIn: "root"
})
export class LostObjectFoundResolver implements Resolve<Promise<any>> {

    constructor(private lostObjectService: LostObjectService, private loginService: LoginService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        console.log("resolving lost objects found");
        return this.lostObjectService.findAllById(this.loginService.getCurrentId());
    }

}