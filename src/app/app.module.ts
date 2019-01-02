import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppComponent } from "./app.component";
import { LoginComponent } from "~/app/login/login.component";
import { AppRoutingModule } from "~/app/route/app-routing.module";
import { HomeComponent } from "~/app/home/home.component";
import { ProfileComponent } from "~/app/profile/profile.component";
import { DatePickerModalComponent } from "~/app/datepicker-modal/datepicker-modal.component";
import { LostObjectCreateComponent } from "~/app/lost-object-create/lost-object-create.component";
import { LostObjectListComponent } from "~/app/lost-object-list/lost-object-list.component";
import { LostObjectFoundComponent } from "~/app/lost-object-found/lost-object-found.component";
import { LostObjectEditComponent } from "~/app/lost-object-edit/lost-object-edit.component";
import { LostObjectViewComponent } from "~/app/lost-object-view/lost-object-view.component";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        DatePickerModalComponent,
        LostObjectListComponent,
        LostObjectCreateComponent,
        LostObjectFoundComponent,
        LostObjectEditComponent,
        LostObjectViewComponent
    ],
    providers: [
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ DatePickerModalComponent ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
