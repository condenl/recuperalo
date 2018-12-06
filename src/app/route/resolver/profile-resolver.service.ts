import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ImageService } from '~/app/shared/image.service';
import { LoginService } from '~/app/shared/login.service';
import { ProfileService } from '~/app/shared/profile.service';

@Injectable({
    providedIn: "root"
})
export class ProfileResolver implements Resolve<Promise<string>> {

    constructor(private profileService: ProfileService, private loginService: LoginService) { }

    public resolve(): Promise<string> {
        console.log("resolving profile picture");
        return this.profileService.getProfileImage(this.loginService.getCurrentUid())
            .catch(() => {
                return ""; //TODO think on a better error handling
        });
    }

}