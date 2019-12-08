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

    constructor(private routeUtils: RouteUtilsService, 
        private appUserService: AppUserService) { }
    
    public facebookLogin(url: string): void {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then(user => this.loginSucess(user, url))
        .catch(error => console.log("facebookLogin error: " + error));
    }

    public anonymousLogin(url: string): void {
        firebase.login({ type: firebase.LoginType.ANONYMOUS })
            .then(user => this.loginSucess(user, url))
            .catch(error => console.log("anonymousLogin error: " + error));
    }

    private loginSucess(user, url): void {
        if (user.additionalUserInfo.isNewUser) {
            
            this.getDeviceToken()
                .then(token =>
                    this.appUserService.create({
                        uid: user.uid,
                        email: user.email,
                        profilePhotoUrl: this.getSocialMediaProfilePhoto(user),
                        pushToken: token
                    } as AppUser))
                .then(result => {
                    this.currentId = result.key;
                    this.routeUtils.routeTo(url, "slideTop");
                });
        } else {
            this.getDeviceToken().then(token =>
                this.appUserService.findByUid(user.uid).then(appUser => {
                    this.currentId = appUser.id;
                    appUser.pushToken = token;
                    return this.appUserService.update(appUser, appUser.id);
                })
            ).then(() => this.routeUtils.routeTo(url, "slideTop"));
        }
    }

    getDeviceToken(): Promise<any> {
        return firebase.getCurrentPushToken();
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
