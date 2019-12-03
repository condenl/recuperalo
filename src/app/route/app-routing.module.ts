import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "~/app/login/login.component";
import { MainComponent } from "~/app/main/main.component";
import { ProfileComponent } from "~/app/profile/profile.component";
import { AuthGuard } from "~/app/route/guard/auth-guard.service";
import { BypassLoginGuard } from "~/app/route/guard/bypass-login-guard.service";
import { ProfileImageResolver } from "~/app/route/resolver/profile-image-resolver.service";
import { AppUserResolver } from "~/app/route/resolver/app-user-resolver.service";
import { FirebaseUserResolver } from "~/app/route/resolver/firebase-user-resolver.service";
import { LostObjectListComponent } from "~/app/lost-object-list/lost-object-list.component";
import { LostObjectCreateComponent } from "~/app/lost-object-create/lost-object-create.component";
import { NoPhotoResolver } from "~/app/route/resolver/no-photo-resolver.service";
import { LostObjectFoundResolver } from "~/app/route/resolver/lost-object-found-resolver.service";
import { UsernameSetGuard } from "~/app/route/guard/username-set-guard.service";
import { LostObjectEditComponent } from "~/app/lost-object-edit/lost-object-edit.component";
import { LostObjectResolver } from "~/app/route/resolver/lost-object-resolver.service";
import { LostObjectImageResolver } from "~/app/route/resolver/lost-object-image-resolver.service";
import { LostObjectListResolver } from "~/app/route/resolver/lost-object-list-resolver.service";
import { LostObjectViewComponent } from "~/app/lost-object-view/lost-object-view.component";
import { ChatComponent } from "../chat/chat.component";
import { ChatListComponent } from "../chat-list/chat-list.component";
import { ChatResolver } from "./resolver/chat-resolver.service";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [ BypassLoginGuard ] },
    { path: "home", component: MainComponent, canActivate: [ AuthGuard ],
      children: [
        {
            path: 'list',
            component: LostObjectListComponent,
            resolve: {
                lostObjects: LostObjectListResolver
            },
            data: {
                detailUrl: "lost-object-view/"
            }
        },
        {
            path: 'chats', 
            component: ChatListComponent, 
            resolve: {
                appUser: AppUserResolver
            }
        },
        {
            path: 'create',
            component: LostObjectCreateComponent,
            canActivate: [UsernameSetGuard],
            resolve: {
                appUser: AppUserResolver,
                noPhotoUrl: NoPhotoResolver
            }
        },
        {
            path: 'found',
            component: LostObjectListComponent,
            resolve: {
                lostObjects: LostObjectFoundResolver
            },
            data: {
                detailUrl: "lost-object-edit/"
            }
        }
      ]
    },
    { path: "lost-object-edit/:itemId", component: LostObjectEditComponent, canActivate: [UsernameSetGuard],
        resolve: { 
            appUser: AppUserResolver,
            imageUrl: LostObjectImageResolver,
            lostObject: LostObjectResolver
        }
    },
    { path: "lost-object-view/:itemId", component: LostObjectViewComponent,
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
    },
    { path: "chat/:itemId", component: ChatComponent, 
        resolve: {
            appUser: AppUserResolver,
            chat: ChatResolver,
            lostObject: LostObjectResolver
        }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }