"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        firebase.init({
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
        }).then(function (instance) { return console.log("firebase.init done"); }, function (error) { return console.log("firebase.init error: " + error); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            moduleId: module.id,
            templateUrl: "./app.component.html",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFFbEQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFPekQ7SUFBQTtJQVlBLENBQUM7SUFWRywrQkFBUSxHQUFSO1FBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQztRQUNWLGtGQUFrRjtRQUNsRiw2QkFBNkI7U0FDaEMsQ0FBQyxDQUFDLElBQUksQ0FDSCxVQUFBLFFBQVEsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsRUFBakMsQ0FBaUMsRUFDN0MsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUF3QixLQUFPLENBQUMsRUFBNUMsQ0FBNEMsQ0FDeEQsQ0FBQztJQUNOLENBQUM7SUFWUSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDO09BQ1csWUFBWSxDQVl4QjtJQUFELG1CQUFDO0NBQUEsQUFaRCxJQVlDO0FBWlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgZmlyZWJhc2UuaW5pdCh7XG4gICAgICAgICAgICAvLyBPcHRpb25hbGx5IHBhc3MgaW4gcHJvcGVydGllcyBmb3IgZGF0YWJhc2UsIGF1dGhlbnRpY2F0aW9uIGFuZCBjbG91ZCBtZXNzYWdpbmcsXG4gICAgICAgICAgICAvLyBzZWUgdGhlaXIgcmVzcGVjdGl2ZSBkb2NzLlxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgaW5zdGFuY2UgPT4gY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIiksXG4gICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhgZmlyZWJhc2UuaW5pdCBlcnJvcjogJHtlcnJvcn1gKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19