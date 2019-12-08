import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { LoginService } from "~/app/shared/login.service";
import { LoginType } from "~/app/shared/login-type.enum";
import { ActivatedRoute } from "@angular/router";
import { RouteFragment } from "~/app/route/route-fragment.enum";
import { localize } from "nativescript-localize";

var Toast = require("nativescript-toast");

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: [ "./login.component.css" ]
})
export class LoginComponent implements OnInit {

    public loginType = LoginType;

    constructor(private route: ActivatedRoute, private page: Page, private loginService: LoginService) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.className = "page-login-container";
        this.page.statusBarStyle = "dark";
    }

    ngOnInit() {
        this.route.fragment.subscribe(fragment => {
            if (fragment == RouteFragment[RouteFragment.LOGOUT]) {
                Toast.makeText(localize("com.recuperalo.mobile.login.successful-logout"), "long").show();
            }
        });
    }

    login(loginType: LoginType) {
        if (loginType == LoginType.FACEBOOK) {
            this.loginService.facebookLogin("home");
        } else {
            this.loginService.anonymousLogin("home");
        }
    }

}
