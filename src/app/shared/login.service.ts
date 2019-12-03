import { Injectable } from "@angular/core";
import { RouteUtilsService } from "~/app/route/route-utils.service";
import { AppUserService } from "~/app/shared/app-user.service";
import { AppUser } from "~/app/shared/app-user";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class LoginService {

    private currentId: string = "";

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
                uid: user.uid,
                email: user.email,
                profilePhotoUrl: this.getSocialMediaProfilePhoto(user)
            } as AppUser)
                .then(
                    result => {
                        console.dir(result);
                        console.log("created key: " + result.key);
                        console.log("created uid: " + user.uid);
                        this.currentId = result.key;
                        this.routeUtils.routeTo(url, "slideTop");
                    }
                );
        } else {
            this.appUserService.findByUid(user.uid)
                .then(appUser => {
                    this.currentId = appUser.id;
                    this.routeUtils.routeTo(url, "slideTop");
                });
        }
    }

    private getSocialMediaProfilePhoto(user: any): string {
        return user.additionalUserInfo.providerId == 'facebook.com' ? user.additionalUserInfo.profile.picture.data.url : null
    }

    public getCurrentId(): string {
        return this.currentId;
    }

    public setCurrentId(currentId: string): void {
        this.currentId = currentId;
    }

    public getCurrentUser(): Promise<any> {
        return firebase.getCurrentUser();
    }

    public logOut(): void {
        firebase.logout();
        this.currentId = "";
    }

}
