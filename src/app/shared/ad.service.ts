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
                bottom: 0
            },
            testing: true,
            androidBannerId: "ca-app-pub-2414445891745010/7307188387"
        }).then(
            function (data) {
                console.log("AdMob banner created", data);
            }, 
            function (err) {
                console.log("AdMob banner error", err);
            }
        );
    }

}