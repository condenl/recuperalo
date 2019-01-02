"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var forms_2 = require("@angular/forms");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var app_component_1 = require("./app.component");
var login_component_1 = require("~/app/login/login.component");
var app_routing_module_1 = require("~/app/route/app-routing.module");
var home_component_1 = require("~/app/home/home.component");
var profile_component_1 = require("~/app/profile/profile.component");
var datepicker_modal_component_1 = require("~/app/datepicker-modal/datepicker-modal.component");
var lost_object_create_component_1 = require("~/app/lost-object-create/lost-object-create.component");
var lost_object_list_component_1 = require("~/app/lost-object-list/lost-object-list.component");
var lost_object_found_component_1 = require("~/app/lost-object-found/lost-object-found.component");
var lost_object_edit_component_1 = require("~/app/lost-object-edit/lost-object-edit.component");
var lost_object_view_component_1 = require("~/app/lost-object-view/lost-object-view.component");
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.NativeScriptFormsModule,
                forms_2.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                profile_component_1.ProfileComponent,
                datepicker_modal_component_1.DatePickerModalComponent,
                lost_object_list_component_1.LostObjectListComponent,
                lost_object_create_component_1.LostObjectCreateComponent,
                lost_object_found_component_1.LostObjectFoundComponent,
                lost_object_edit_component_1.LostObjectEditComponent,
                lost_object_view_component_1.LostObjectViewComponent
            ],
            providers: [
                modal_dialog_1.ModalDialogService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
            entryComponents: [datepicker_modal_component_1.DatePickerModalComponent]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFFckQsa0VBQXVFO0FBRXZFLGlEQUErQztBQUMvQywrREFBNkQ7QUFDN0QscUVBQWtFO0FBQ2xFLDREQUEwRDtBQUMxRCxxRUFBbUU7QUFDbkUsZ0dBQTZGO0FBQzdGLHNHQUFrRztBQUNsRyxnR0FBNEY7QUFDNUYsbUdBQStGO0FBQy9GLGdHQUE0RjtBQUM1RixnR0FBNEY7QUFFNUYsa0ZBQWtGO0FBQ2xGLG1GQUFtRjtBQW1DbkY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBakNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7YUFDdEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixxREFBd0I7Z0JBQ3hCLG9EQUF1QjtnQkFDdkIsd0RBQXlCO2dCQUN6QixzREFBd0I7Z0JBQ3hCLG9EQUF1QjtnQkFDdkIsb0RBQXVCO2FBQzFCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGlDQUFrQjthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7WUFDRCxlQUFlLEVBQUUsQ0FBRSxxREFBd0IsQ0FBRTtTQUNoRCxDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwifi9hcHAvcm91dGUvYXBwLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFByb2ZpbGVDb21wb25lbnQgfSBmcm9tIFwifi9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2RhdGVwaWNrZXItbW9kYWwvZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvc3RPYmplY3RDcmVhdGVDb21wb25lbnQgfSBmcm9tIFwifi9hcHAvbG9zdC1vYmplY3QtY3JlYXRlL2xvc3Qtb2JqZWN0LWNyZWF0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvc3RPYmplY3RMaXN0Q29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2xvc3Qtb2JqZWN0LWxpc3QvbG9zdC1vYmplY3QtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvc3RPYmplY3RGb3VuZENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9sb3N0LW9iamVjdC1mb3VuZC9sb3N0LW9iamVjdC1mb3VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvc3RPYmplY3RFZGl0Q29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2xvc3Qtb2JqZWN0LWVkaXQvbG9zdC1vYmplY3QtZWRpdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IExvc3RPYmplY3RWaWV3Q29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2xvc3Qtb2JqZWN0LXZpZXcvbG9zdC1vYmplY3Qtdmlldy5jb21wb25lbnRcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdGhlIEh0dHBDbGllbnQgd3JhcHBlclxuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgTG9naW5Db21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIFByb2ZpbGVDb21wb25lbnQsXG4gICAgICAgIERhdGVQaWNrZXJNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTG9zdE9iamVjdExpc3RDb21wb25lbnQsXG4gICAgICAgIExvc3RPYmplY3RDcmVhdGVDb21wb25lbnQsXG4gICAgICAgIExvc3RPYmplY3RGb3VuZENvbXBvbmVudCxcbiAgICAgICAgTG9zdE9iamVjdEVkaXRDb21wb25lbnQsXG4gICAgICAgIExvc3RPYmplY3RWaWV3Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogWyBEYXRlUGlja2VyTW9kYWxDb21wb25lbnQgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==