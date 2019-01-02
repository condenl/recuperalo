import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "~/app/login/login.component";
import { HomeComponent } from "~/app/home/home.component";
import { ProfileComponent } from "~/app/profile/profile.component";
import { AuthGuard } from "~/app/route/guard/auth-guard.service";
import { BypassLoginGuard } from "~/app/route/guard/bypass-login-guard.service";
import { ProfileImageResolver } from "~/app/route/resolver/profile-image-resolver.service";
import { AppUserResolver } from "~/app/route/resolver/app-user-resolver.service";
import { FirebaseUserResolver } from "~/app/route/resolver/firebase-user-resolver.service";
import { LostObjectListComponent } from "~/app/lost-object-list/lost-object-list.component";
import { LostObjectCreateComponent } from "~/app/lost-object-create/lost-object-create.component";
import { LostObjectCreateResolver } from "~/app/route/resolver/lost-object-create-resolver.service";
import { LostObjectFoundComponent } from "~/app/lost-object-found/lost-object-found.component";
import { LostObjectFoundResolver } from "~/app/route/resolver/lost-object-found-resolver.service";
import { UsernameSetGuard } from "~/app/route/guard/username-set-guard.service";
import { LostObjectEditComponent } from "~/app/lost-object-edit/lost-object-edit.component";
import { LostObjectResolver } from "~/app/route/resolver/lost-object-resolver.service";
import { LostObjectImageResolver } from "~/app/route/resolver/lost-object-image-resolver.service";
import { LostObjectListResolver } from "~/app/route/resolver/lost-object-list-resolver.service";
import { LostObjectViewComponent } from "~/app/lost-object-view/lost-object-view.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [ BypassLoginGuard ] },
    { path: "home", component: HomeComponent, canActivate: [ AuthGuard ],
      children: [
        {
            path: 'lost-object-list',
            component: LostObjectListComponent,
            resolve: {
                lostObjectWrappers: LostObjectListResolver
            }
        },
        {
            path: 'create',
            component: LostObjectCreateComponent,
            canActivate: [UsernameSetGuard],
            resolve: {
                appUser: AppUserResolver,
                emptyImageUrl: LostObjectCreateResolver
            }
        },
        {
            path: 'found',
            component: LostObjectFoundComponent,
            resolve: {
                lostObjectWrappers: LostObjectFoundResolver
            }
        }
      ]
    },
    { path: "lost-object-edit/:firebaseKey", component: LostObjectEditComponent, canActivate: [UsernameSetGuard],
        resolve: { 
            appUser: AppUserResolver,
            imageUrl: LostObjectImageResolver,
            lostObject: LostObjectResolver
        }
    },
    { path: "lost-object-view/:firebaseKey", component: LostObjectViewComponent,
        resolve: { 
            appUser: AppUserResolver,
            imageUrl: LostObjectImageResolver,
            lostObject: LostObjectResolver
        }
    },
    { path: "profile", component: ProfileComponent, canActivate: [ AuthGuard ], 
        resolve: { 
            profileImageUrl: ProfileImageResolver,
            appUser: AppUserResolver,
            firebaseUser: FirebaseUserResolver
        }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }