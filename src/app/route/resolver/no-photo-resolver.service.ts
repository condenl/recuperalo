import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ImageService } from '~/app/shared/image.service';
import { LoginService } from '~/app/shared/login.service';
import { AppUserService } from '~/app/shared/app-user.service';
import { LostObjectService } from '~/app/shared/lost-object.service';

@Injectable({
    providedIn: "root"
})
export class NoPhotoResolver implements Resolve<Promise<string>> {

    constructor(private lostObjectService: LostObjectService) { }

    public resolve(): Promise<string> {
        console.log("resolving no-photo picture");
        return this.lostObjectService.getDefaultLostObjectImage();
    }

}