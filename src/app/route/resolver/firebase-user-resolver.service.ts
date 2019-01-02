import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { AppUser } from '~/app/shared/app-user';
import { AppUserService } from '~/app/shared/app-user.service';

@Injectable({
    providedIn: "root"
})
export class FirebaseUserResolver implements Resolve<Promise<any>> {

    constructor(private loginService: LoginService) { }

    public resolve(): Promise<{ [key: string]: any; }> {
        console.log("resolving firebase user");
        return this.loginService.getCurrentUser();
    }

}