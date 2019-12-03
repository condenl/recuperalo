import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';

@Component({
    selector: 'ns-lost-object-view',
    moduleId: module.id,
    templateUrl: './lost-object-view.component.html',
    styleUrls: ['./lost-object-view.component.css']
})
export class LostObjectViewComponent implements OnInit {

    private lostObjectImageUrl: string;

    private lostObjectFirebaseKey: string;

    private lostObject: LostObject;

    private mapView: MapView;

    private appUser: AppUser;

    constructor(private route: ActivatedRoute, 
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { imageUrl: string; 
                    appUser: AppUser;
                    lostObject: any }) => {
                this.lostObjectImageUrl = data.imageUrl;
                this.lostObjectFirebaseKey = Object.keys(data.lostObject)[0];
                this.lostObject = data.lostObject[this.lostObjectFirebaseKey];
                this.appUser = data.appUser[Object.keys(data.appUser)[0]];
            });
    }

    public contact() {
        this.routeUtils.routeTo("/chat/" + this.lostObjectFirebaseKey);
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
    }

    public isCurrentUserOwner(): boolean {
        return this.lostObject.createdBy == this.appUser.userId;
    }

}