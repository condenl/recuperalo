import { Component, OnInit } from "@angular/core";
import { LoginService } from "~/app/shared/login.service";

const firebase = require("nativescript-plugin-firebase");

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
                this.loginService.setCurrentUid(data.loggedIn ? data.user.uid : "");
            }
        }).then(
            instance => console.log("firebase.init done"),
            error => console.log(`firebase.init error: ${error}`)
        );
    }

}
