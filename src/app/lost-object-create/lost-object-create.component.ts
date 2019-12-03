import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { switchMap } from "rxjs/operators";
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerElement } from "nativescript-angular/element-registry";
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';
import { UUIDUtils } from '../shared/uuid-utils';
import { Image } from '../shared/image';

var fs = require("tns-core-modules/file-system");
var imagepicker = require("nativescript-imagepicker");
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: 'ns-lost-object-create',
    moduleId: module.id,
    templateUrl: './lost-object-create.component.html',
    styleUrls: ['./lost-object-create.component.css']
})
export class LostObjectCreateComponent implements OnInit {

    private images: Array<Image>;

    private maxOrdinal: number = 0;

    private lostObjectCreateForm: FormGroup;

    private mapView: MapView;

    private appUser: AppUser;

    private publishTimestamp: number;

    constructor(private lostObjectService: LostObjectService, 
        private loaderUtils: LoaderUtilsService,
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { noPhotoUrl: string; 
                    appUser: AppUser }) => {
                this.appUser = data.appUser;
                this.images = [{ url: data.noPhotoUrl } as Image];
            });

        this.lostObjectCreateForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.publishTimestamp = new Date().getTime();
        this.homeActivityIndicatorService.notBusy();
    }

    public choosePicture(): void {
        let context = imagepicker.create({ mode: "single" });
        context.authorize().then(
            () => context.present()
        ).then(selection => {
            selection.forEach(selected => {
            console.log("about to upload the lost object image");
            let uuid = UUIDUtils.uuidv4();
            this.lostObjectService.uploadImage(selected, uuid)
                .then(remoteUrl => this.images.push(this.populateImage(uuid, remoteUrl)));
            });
        });
    }

    private populateImage(uuid: string, url: string) {
        let image: Image = {} as Image;
        image.uuid = uuid;
        image.url = url;
        image.ordinal = this.maxOrdinal++;
        return image;
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
    };

    public createLostObject() {
        this.lostObjectService.create(this.populateLostObject())
            .then(() => {
                this.routeUtils.routeTo("/home/found");
            });
    }

    private populateLostObject(): LostObject {
        let lostObject: LostObject = {} as LostObject;
        lostObject.createdById = this.appUser.id;
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = this.publishTimestamp;
        lostObject.lastUpdateTimestamp = this.publishTimestamp;
        lostObject.location = [this.mapView["latitude"] , this.mapView["longitude"]];
        lostObject.username = this.appUser.username;
        lostObject.photos = this.images;
        return lostObject;
    }

    get name() {
        return this.lostObjectCreateForm.get("name");
    }
    
    get description() {
        return this.lostObjectCreateForm.get("description");
    }

}