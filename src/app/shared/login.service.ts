import { Injectable } from "@angular/core";
import { RouteUtilsService } from "~/app/route/route-utils.service";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class LoginService {

    private currentUid: string = "";

    constructor(private routeUtils: RouteUtilsService) { }
    
    public facebookLogin(url: string): void {
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then(
            user => {
                this.currentUid = user.uid;
                this.routeUtils.routeTo(url, "slideTop");
            }
        ).catch(
            error => console.log("Trouble in paradise: " + error)
        );
    }

    public anonymousLogin(url: string): void {
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then(
            user => {
                this.currentUid = user.uid;
                this.routeUtils.routeTo(url, "slideTop");
            }
        ).catch(
            error => console.log("Trouble in paradise: " + error)
        );
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
