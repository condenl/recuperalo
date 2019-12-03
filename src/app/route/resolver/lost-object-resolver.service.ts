import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { LostObject } from '~/app/shared/lost-object';
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
        return this.lostObjectService.findByFirebaseKey(route.params['itemId'])
            .then(lo => {
                lostObject = lo;
                return this.appUserService.findById((lo[Object.keys(lo)[0]] as LostObject).createdBy);
            })
            .then(createdBy => {
                let createdById = Object.keys(createdBy)[0];
                (lostObject[Object.keys(lostObject)[0]] as LostObject).createdByAppUser = (<any>Object).assign({userId: createdById}, createdBy[createdById]) as AppUser;
                return lostObject;
            });
    }

}