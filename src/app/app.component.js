"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("~/app/shared/login.service");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent(loginService) {
        this.loginService = loginService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebase.init({
            onAuthStateChanged: function (data) { return _this.loginService.setCurrentUid(data.loggedIn ? data.user.uid : ""); }
        }).then(function (instance) { return console.log("firebase.init done"); }, function (error) {
            console.log("firebase.init error: " + error);
            if (error.includes("Firebase already initialized")) {
                firebase.getCurrentUser()
                    .then(function (user) { return _this.loginService.setCurrentUid(user.uid); })
                    .catch(function (error) { return _this.loginService.setCurrentUid(""); });
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            moduleId: module.id,
            templateUrl: "./app.component.html",
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNERBQTBEO0FBRTFELElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBT3pEO0lBRUksc0JBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUksQ0FBQztJQUVuRCwrQkFBUSxHQUFSO1FBQUEsaUJBY0M7UUFiRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ1Ysa0JBQWtCLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQW5FLENBQW1FO1NBQ2xHLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQSxRQUFRLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQWpDLENBQWlDLEVBQzdDLFVBQUEsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLEtBQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO2dCQUNoRCxRQUFRLENBQUMsY0FBYyxFQUFFO3FCQUNwQixJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQXpDLENBQXlDLENBQUM7cUJBQ3ZELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7YUFDNUQ7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFsQlEsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQzt5Q0FHb0MsNEJBQVk7T0FGckMsWUFBWSxDQW9CeEI7SUFBRCxtQkFBQztDQUFBLEFBcEJELElBb0JDO0FBcEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIn4vYXBwL3NoYXJlZC9sb2dpbi5zZXJ2aWNlXCI7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgICAgICAgIG9uQXV0aFN0YXRlQ2hhbmdlZDogZGF0YSA9PiB0aGlzLmxvZ2luU2VydmljZS5zZXRDdXJyZW50VWlkKGRhdGEubG9nZ2VkSW4gPyBkYXRhLnVzZXIudWlkIDogXCJcIilcbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgIGluc3RhbmNlID0+IGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBkb25lXCIpLFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBmaXJlYmFzZS5pbml0IGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5pbmNsdWRlcyhcIkZpcmViYXNlIGFscmVhZHkgaW5pdGlhbGl6ZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB0aGlzLmxvZ2luU2VydmljZS5zZXRDdXJyZW50VWlkKHVzZXIudWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmxvZ2luU2VydmljZS5zZXRDdXJyZW50VWlkKFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=