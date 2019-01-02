import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { AppUser } from '~/app/shared/app-user';
import { AppUserService } from '~/app/shared/app-user.service';

@Injectable({
    providedIn: "root"
})
export class AppUserResolver implements Resolve<Promise<any>> {

    constructor(private loginService: LoginService, private appUserService: AppUserService) { }

    public resolve(): Promise<{ [key: string]: AppUser; }> {
        console.log("resolving app user");
        return this.appUserService.findById(this.loginService.getCurrentUid());
    }

}