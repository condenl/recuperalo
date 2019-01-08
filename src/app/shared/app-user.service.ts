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

    public findById(uid: string): Promise<{ [key: string]: AppUser; }> {
        return firebase.query(function(result) {
                if (result.error)
                    console.log("Error retrieving app-user by key: " + result.key);
            },
            "/appUser",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'userId'
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: uid
                }
            }
        ).then(
            result => result.value
        );
    }

    public isUsernameTaken(username: string, uid: string): Promise<boolean> {
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
            result => result.value != null && result.value[Object.keys(result.value)[0]].userId != uid
        );
    }

    public sendEmailVerification(): void {
        firebase.sendEmailVerification().then(
            () => console.log("Email verification sent"),
            (error) => console.log("Error sending email verification: " + error)
        );
    }

    /**
     * Gives default image if neither uid-tied image nor social media image is found
     */
    public getProfileImage(uid: string): Promise<string> {
        return this.imageService.remoteUrl("profile/" + uid + ".png")
            .catch(error => {
                return this.findById(uid).then(
                    result => {
                        let url: string = this.getSocialMediaProfileImage(result[Object.keys(result)[0]]);
                        if (url != null) {
                            return url;
                        }
                        return this.getDefaultProfileImage();
                    }
                )
            });
    }

    private getSocialMediaProfileImage(appUser: AppUser): string {
        let url: string = null;
        if (appUser.profileImageUrl != null) {
            url = appUser.profileImageUrl;
        }
        return url;
    }

    public getDefaultProfileImage(): Promise<string> {
        console.log("getting default profile image");
        return this.imageService.remoteUrl("profile/default-profile.png");
    }

    public uploadProfileImage(image: any, uid: string): Promise<string> {
        return this.imageService.uploadImage(image, 'profile/' + uid + '.png');
    }

    public create(appUser: AppUser): Promise<any> {
        return firebase.push("/appUser", appUser);
    }

    public update(appUser: AppUser, firebaseKey: string): Promise<any> {
        console.log("firebase key in app-user service: ", firebaseKey);
        return firebase.setValue("/appUser/" + firebaseKey, appUser);
    }

}