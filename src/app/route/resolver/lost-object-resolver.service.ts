import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { LostObjectService } from '~/app/shared/lost-object.service';

@Injectable({
    providedIn: "root"
})
export class LostObjectResolver implements Resolve<Promise<any>> {

    constructor(private lostObjectService: LostObjectService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        console.log("executing LostObjectResolver");
        return this.lostObjectService.findByFirebaseKey(route.params['firebaseKey']);
    }

}