import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppComponent } from "./app.component";
import { LoginComponent } from "~/app/login/login.component";
import { AppRoutingModule } from "~/app/route/app-routing.module";
import { MainComponent } from "~/app/main/main.component";
import { ProfileComponent } from "~/app/profile/profile.component";
import { DatePickerModalComponent } from "~/app/datepicker-modal/datepicker-modal.component";
import { LostObjectCreateComponent } from "~/app/lost-object-create/lost-object-create.component";
import { LostObjectListComponent } from "~/app/lost-object-list/lost-object-list.component";
import { LostObjectEditComponent } from "~/app/lost-object-edit/lost-object-edit.component";
import { LostObjectViewComponent } from "~/app/lost-object-view/lost-object-view.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatComponent } from "./chat/chat.component";
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { ImageReorderComponent } from "./image-reorder/image-reorder.component";
import { ModalSingleImageComponent } from "./modal-single-image/modal-single-image.component";

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
        ReactiveFormsModule,
        NativeScriptLocalizeModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        ProfileComponent,
        DatePickerModalComponent,
        LostObjectListComponent,
        LostObjectCreateComponent,
        LostObjectEditComponent,
        LostObjectViewComponent,
        ChatListComponent,
        ChatComponent,
        ImageSliderComponent,
        ImageReorderComponent,
        ModalSingleImageComponent
    ],
    providers: [
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ DatePickerModalComponent, ModalSingleImageComponent ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
