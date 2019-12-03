import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { LostObjectService } from '~/app/shared/lost-object.service';

@Injectable({
    providedIn: "root"
})
export class LostObjectImageResolver implements Resolve<Promise<any>> {

    constructor(private lostObjectService: LostObjectService, private loginService: LoginService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
        console.log("resolving lost object image");
        return this.lostObjectService.findByFirebaseKey(route.params['itemId'])
            .then(result => {
                return this.lostObjectService.getImage(this.loginService.getCurrentUid() + "-" + result[Object.keys(result)[0]].publishTimestamp)
            });
    }

}
