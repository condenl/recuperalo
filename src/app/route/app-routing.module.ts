import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "~/app/login/login.component";
import { HomeComponent } from "~/app/home/home.component";
import { ProfileComponent } from "~/app/profile/profile.component";
import { AuthGuard } from "~/app/route/guard/auth-guard.service";
import { BypassLoginGuard } from "~/app/route/guard/bypass-login-guard.service";
import { ProfileResolver } from "~/app/route/resolver/profile-resolver.service";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [ BypassLoginGuard ] },
    { path: "home", component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: "profile", component: ProfileComponent, canActivate: [ AuthGuard ], resolve: { profileImageUrl: ProfileResolver } }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }