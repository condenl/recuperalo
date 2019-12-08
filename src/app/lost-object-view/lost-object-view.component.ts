import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';
import { Image } from '../shared/image';
import { localize } from "nativescript-localize";
import { RouteFragment } from '../route/route-fragment.enum';

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

    private backUrl: string = "home";

    private fromChat: boolean = false;

    constructor(private route: ActivatedRoute, private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        console.log("LostObjectViewComponent chatId", this.route.snapshot.params.chatId);
        this.route.fragment.subscribe(fragment => {
            if (!this.fromChat && fragment == RouteFragment[RouteFragment.FROM_CHAT]) {
                this.fromChat = true;
                this.backUrl = "/chat/" + this.route.snapshot.params.itemId  
                   + (this.route.snapshot.params.chatId ? "/" + this.route.snapshot.params.chatId : '');
            }
        });
        
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
            Toast.makeText(localize("com.recuperalo.mobile.required.username")).show();
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