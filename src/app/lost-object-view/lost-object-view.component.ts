import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';
import { Image } from '../shared/image';
import { localize } from "nativescript-localize";

var Toast = require("nativescript-toast");

@Component({
    selector: 'ns-lost-object-view',
    moduleId: module.id,
    templateUrl: './lost-object-view.component.html',
    styleUrls: ['./lost-object-view.component.css']
})
export class LostObjectViewComponent implements OnInit {

    private photos: Array<Image>;

    private noPhotoUrl: string;

    private lostObject: LostObject;

    private mapView: MapView;

    private appUser: AppUser;

    constructor(private route: ActivatedRoute, 
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { appUser: AppUser; lostObject: LostObject; noPhotoUrl: string; }) => {
                this.noPhotoUrl = data.noPhotoUrl;
                this.lostObject = data.lostObject;
                this.appUser = data.appUser;
                this.populatePhotos(this.lostObject);
            });
    }

    populatePhotos(lostObject: LostObject) {
        let result: Array<Image> = [{ url: this.noPhotoUrl } as Image];
        if (lostObject.photos && lostObject.photos.length > 0) {
            result = lostObject.photos
        }
        this.photos = result;
    }

    public contact() {
        if (!this.appUser.username) {
            Toast.makeText(localize("com.recuperalo.mobile.no-photos")).show();
            return;
        }
        this.routeUtils.routeTo("/chat/" + this.lostObject.id);
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
    }

    public isCurrentUserOwner(): boolean {
        return this.lostObject.createdById == this.appUser.id;
    }

}