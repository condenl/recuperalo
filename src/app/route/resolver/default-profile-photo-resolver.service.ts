import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AppUserService } from '~/app/shared/app-user.service';

@Injectable({
    providedIn: "root"
})
export class DefaultProfilePhotoResolver implements Resolve<Promise<string>> {

    constructor(private appUserService: AppUserService) { }

    public resolve(): Promise<string> {
        console.log("resolving default-profile-photo picture");
        return this.appUserService.getDefaultProfilePhoto();
    }

}