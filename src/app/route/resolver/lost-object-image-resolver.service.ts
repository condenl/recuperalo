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
        console.log("executing LostObjectFoundResolver");
        return this.lostObjectService.findByFirebaseKey(route.params['firebaseKey'])
            .then(result => {
                console.log("image name to fetch: "  + this.loginService.getCurrentUid() + "-" + result[Object.keys(result)[0]].publishTimestamp);
                return this.lostObjectService.getImage(this.loginService.getCurrentUid() + "-" + result[Object.keys(result)[0]].publishTimestamp)
            });
    }

}
