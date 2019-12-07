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

    showBanner(view) {
        firebase.admob.showBanner({
            view: view,
            size: firebase.admob.AD_SIZE.SMART_BANNER,
            margins: {
                bottom: 50
            },
            testing: true,
            androidBannerId: "ca-app-pub-2414445891745010/7307188387"
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