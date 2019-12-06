import { Component, OnInit } from "@angular/core";
import { LoginService } from "~/app/shared/login.service";
import { registerElement } from "nativescript-angular/element-registry";
import { Carousel, CarouselItem } from 'nativescript-carousel';

const firebase = require("nativescript-plugin-firebase");

registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    
    constructor(private loginService: LoginService) { }

    ngOnInit(): void {
        firebase.init({
            onAuthStateChanged: data => {
                console.log("authStateChanged: ", JSON.stringify(data));
                if (!data.loggedIn) { // to immediately re-logon the user when his session expires
                    this.loginService.setCurrentId(null);
                }
            }
        }).then(
            instance => console.log("firebase.init done"),
            error => console.log(`firebase.init error: ${error}`)
        );
    }

}
