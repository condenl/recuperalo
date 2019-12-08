import { Component, OnInit } from "@angular/core";
import { LoginService } from "~/app/shared/login.service";
import { registerElement } from "nativescript-angular/element-registry";
import { RouteUtilsService } from "./route/route-utils.service";

const firebase = require("nativescript-plugin-firebase");

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    
    constructor(private loginService: LoginService, 
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        firebase.init({
            onAuthStateChanged: data => {
                console.log("authStateChanged: ", JSON.stringify(data));
                if (!data.loggedIn) { // to immediately re-logon the user when his session expires
                    this.loginService.setCurrentId(null);
                }
            },
            onPushTokenReceivedCallback: token => {
                console.log("Firebase push token:", token);
            },
            onMessageReceivedCallback: (message) => {
                console.log("FCM message", message);
                if (message.chatId && message.itemId) {
                    this.routeUtils.routeTo("/chat/" + message.itemId + "/" +  message.chatId);
                }
            }
        }).then(
            instance => console.log("firebase.init done"),
            error => console.log(`firebase.init error: ${error}`)
        );
    }

}
