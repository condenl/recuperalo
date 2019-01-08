import { Injectable } from "@angular/core";

const firebase = require("nativescript-plugin-firebase");

/**
 * Provides ads management implemented using AdMob 
 */
@Injectable({
    providedIn: "root"
})
export class AdService {

    constructor() { }

    showBanner() {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER,
            margins: {
                top: -1
            },
            testing: true,
            androidBannerId: "ca-app-pub-2414445891745010/7307188387",
            keywords: ["foo", "bar"]
        }).then(
            function () {
                console.log("AdMob banner created");
            }, 
            function (err) {
                console.log(err);
            }
        );
    }

}