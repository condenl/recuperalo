import { Injectable } from "@angular/core";
import { RouteUtilsService } from "~/app/route/route-utils.service";
import { AppUserService } from "~/app/shared/app-user.service";
import { AppUser } from "~/app/shared/app-user";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class LoginService {

    private currentUid: string = "";

    constructor(private routeUtils: RouteUtilsService, private appUserService: AppUserService) { }
    
    public facebookLogin(url: string): void {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then(user => this.loginSucess(user, url))
        .catch(error => console.log("Trouble in paradise: " + error));
    }

    public anonymousLogin(url: string): void {
        firebase.login({ type: firebase.LoginType.ANONYMOUS })
            .then(user => this.loginSucess(user, url))
            .catch(error => console.log("Trouble in paradise: " + error));
    }

    private loginSucess(user, url): void {
        console.log("additionalUserInfo");
        console.dir(user);
        console.dir(user.additionalUserInfo.isNewUser);
        if (user.additionalUserInfo.isNewUser) {
            this.appUserService.create({
                userId: user.uid,
                email: user.email,
                profileImageUrl: this.getSocialMediaProfileImage(user)
            } as AppUser)
                .then(
                    result => {
                        console.dir(result);
                        console.log("created key: " + result.key)
                        this.currentUid = user.uid;
                        this.routeUtils.routeTo(url, "slideTop");
                    }
                );
        } else {
            this.currentUid = user.uid;
            this.routeUtils.routeTo(url, "slideTop");
        }
    }

    private getSocialMediaProfileImage(user: any): string {
        return user.additionalUserInfo.providerId == 'facebook.com' ? user.additionalUserInfo.profile.picture.data.url : null
    }

    public getCurrentUid(): string {
        return this.currentUid;
    }

    public setCurrentUid(currentUid: string): void {
        this.currentUid = currentUid;
    }

    public getCurrentUser(): Promise<any> {
        return firebase.getCurrentUser();
    }

    public logOut(): void {
        firebase.logout();
        this.currentUid = "";
    }

}
