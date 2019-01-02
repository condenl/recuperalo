import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ImageService } from '~/app/shared/image.service';
import { LoginService } from '~/app/shared/login.service';
import { AppUserService } from '~/app/shared/app-user.service';

@Injectable({
    providedIn: "root"
})
export class ProfileImageResolver implements Resolve<Promise<string>> {

    constructor(private appUserService: AppUserService, private loginService: LoginService) { }

    public resolve(): Promise<string> {
        console.log("resolving profile picture");
        return this.appUserService.getProfileImage(this.loginService.getCurrentUid());
    }

}