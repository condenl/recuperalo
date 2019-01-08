"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var forms_2 = require("@angular/forms");
var angular_1 = require("nativescript-localize/angular");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var app_component_1 = require("./app.component");
var login_component_1 = require("~/app/login/login.component");
var app_routing_module_1 = require("~/app/route/app-routing.module");
var main_component_1 = require("~/app/main/main.component");
var profile_component_1 = require("~/app/profile/profile.component");
var datepicker_modal_component_1 = require("~/app/datepicker-modal/datepicker-modal.component");
var lost_object_create_component_1 = require("~/app/lost-object-create/lost-object-create.component");
var lost_object_list_component_1 = require("~/app/lost-object-list/lost-object-list.component");
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
                forms_2.ReactiveFormsModule,
                angular_1.NativeScriptLocalizeModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                main_component_1.MainComponent,
                profile_component_1.ProfileComponent,
                datepicker_modal_component_1.DatePickerModalComponent,
                lost_object_list_component_1.LostObjectListComponent,
                lost_object_create_component_1.LostObjectCreateComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSx3Q0FBcUQ7QUFDckQseURBQTJFO0FBRTNFLGtFQUF1RTtBQUV2RSxpREFBK0M7QUFDL0MsK0RBQTZEO0FBQzdELHFFQUFrRTtBQUNsRSw0REFBMEQ7QUFDMUQscUVBQW1FO0FBQ25FLGdHQUE2RjtBQUM3RixzR0FBa0c7QUFDbEcsZ0dBQTRGO0FBQzVGLGdHQUE0RjtBQUM1RixnR0FBNEY7QUFFNUYsa0ZBQWtGO0FBQ2xGLG1GQUFtRjtBQW1DbkY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBakNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsK0JBQXVCO2dCQUN2QiwyQkFBbUI7Z0JBQ25CLG9DQUEwQjthQUM3QjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYixvQ0FBZ0I7Z0JBQ2hCLHFEQUF3QjtnQkFDeEIsb0RBQXVCO2dCQUN2Qix3REFBeUI7Z0JBQ3pCLG9EQUF1QjtnQkFDdkIsb0RBQXVCO2FBQzFCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGlDQUFrQjthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7WUFDRCxlQUFlLEVBQUUsQ0FBRSxxREFBd0IsQ0FBRTtTQUNoRCxDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdExvY2FsaXplTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbGl6ZS9hbmd1bGFyXCI7XG5cbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwifi9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIn4vYXBwL3JvdXRlL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgTWFpbkNvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9tYWluL21haW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IERhdGVQaWNrZXJNb2RhbENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9kYXRlcGlja2VyLW1vZGFsL2RhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb3N0T2JqZWN0Q3JlYXRlQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwL2xvc3Qtb2JqZWN0LWNyZWF0ZS9sb3N0LW9iamVjdC1jcmVhdGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb3N0T2JqZWN0TGlzdENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9sb3N0LW9iamVjdC1saXN0L2xvc3Qtb2JqZWN0LWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb3N0T2JqZWN0RWRpdENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9sb3N0LW9iamVjdC1lZGl0L2xvc3Qtb2JqZWN0LWVkaXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb3N0T2JqZWN0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC9sb3N0LW9iamVjdC12aWV3L2xvc3Qtb2JqZWN0LXZpZXcuY29tcG9uZW50XCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIdHRwQ2xpZW50IHdyYXBwZXJcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdExvY2FsaXplTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgTWFpbkNvbXBvbmVudCxcbiAgICAgICAgUHJvZmlsZUNvbXBvbmVudCxcbiAgICAgICAgRGF0ZVBpY2tlck1vZGFsQ29tcG9uZW50LFxuICAgICAgICBMb3N0T2JqZWN0TGlzdENvbXBvbmVudCxcbiAgICAgICAgTG9zdE9iamVjdENyZWF0ZUNvbXBvbmVudCxcbiAgICAgICAgTG9zdE9iamVjdEVkaXRDb21wb25lbnQsXG4gICAgICAgIExvc3RPYmplY3RWaWV3Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogWyBEYXRlUGlja2VyTW9kYWxDb21wb25lbnQgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==