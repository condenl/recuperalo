import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { AppUserService } from '~/app/shared/app-user.service';
import { AppUser } from '~/app/shared/app-user';

@Injectable({
    providedIn: "root"
})
export class LostObjectResolver implements Resolve<Promise<any>> {

    constructor(private lostObjectService: LostObjectService, private appUserService: AppUserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        console.log("resolving lost object");
        let lostObject: any;
        return this.lostObjectService.findById(route.params['itemId'])
            .then(lo => {
                lostObject = lo;
                return this.appUserService.findById(lo.createdById);
            })
            .then(result => {
                lostObject.createdByAppUser = result;
                return lostObject;
            });
    }

}