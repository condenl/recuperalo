import { Injectable } from "@angular/core";
import { AppUser } from "~/app/shared/app-user";
import { ImageService } from "~/app/shared/image.service";
import { LoginService } from "~/app/shared/login.service";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class AppUserService {

    constructor(private imageService: ImageService) { }

    public findByUid(uid: string) {
        return firebase.query(function(result) {
            if (result.error)
                console.log("Error retrieving app-user by key: " + result.key);
        },
        "/appUser",
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'uid'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: uid
            }
        }
        ).then(result => this.mapFbResultSetToAppUser(result.value));
    }

    public findById(id: string): Promise<AppUser> {
        return firebase.query(
            function(result) {
                if (result.error)
                    console.log("Error retrieving app-user by key: " + result.key);
            },
            "/appUser/" + id, { singleEvent: true }
        ).then(result => this.mapFbResultSetToAppUser(result.value));
    }

    private mapFbResultSetToAppUser(fbResult): AppUser {
        return (<any>Object).assign({id: Object.keys(fbResult)[0]}, fbResult[Object.keys(fbResult)[0]]) as AppUser;
    }

    public isUsernameTaken(username: string, id: string): Promise<boolean> {
        return firebase.query(function(result) {
                if (!result.error) {
                    console.log("Event type: " + result.type);
                    console.log("Key: " + result.key);
                    console.log("Value: " + JSON.stringify(result.value));
                }
            },
            "/appUser",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'username'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: username
                }
            }
        ).then(
            result => result.value != null && Object.keys(result.value)[0] != id
        );
    }

    public sendEmailVerification(): void {
        firebase.sendEmailVerification().then(
            () => console.log("Email verification sent"),
            (error) => console.log("Error sending email verification: " + error)
        );
    }

    public getDefaultProfilePhoto(): Promise<string> {
        console.log("getting default profile photo");
        return this.imageService.remoteUrl("profile/default-profile.png");
    }

    public uploadProfilePhoto(image: any, id: string): Promise<string> {
        return this.imageService.uploadImage(image, 'profile/' + id + '.png');
    }

    public create(appUser: AppUser): Promise<any> {
        return firebase.push("/appUser", appUser);
    }

    public update(appUser: AppUser, id: string): Promise<any> {
        console.log("firebase key in app-user service: ", id);
        return firebase.setValue("/appUser/" + id, appUser);
    }

}