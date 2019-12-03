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
import { Image } from '../shared/image';
import { UUIDUtils } from '../shared/uuid-utils';

var fs = require("tns-core-modules/file-system");
var imagepicker = require("nativescript-imagepicker");

@Component({
    selector: 'ns-lost-object-edit',
    moduleId: module.id,
    templateUrl: './lost-object-edit.component.html',
    styleUrls: ['./lost-object-edit.component.css']
})
export class LostObjectEditComponent implements OnInit {

    private images: Array<Image>;

    private maxOrdinal: number = 0;

    private lostObjectEditForm: FormGroup;

    private lostObject: LostObject;

    private mapView: MapView;

    private appUser: AppUser;

    private noPhotoUrl: string;

    constructor(private lostObjectService: LostObjectService, 
        private loaderUtils: LoaderUtilsService,
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { appUser: AppUser;
                    noPhotoUrl: string; 
                    lostObject: any }) => {
                this.lostObject = data.lostObject;
                this.appUser = data.appUser;
                this.noPhotoUrl = data.noPhotoUrl;
                this.lostObjectEditForm = this.formBuilder.group({
                    name: [this.lostObject.name, Validators.required],
                    description: [this.lostObject.description, Validators.required]
                });
                this.initImagesState(this.lostObject);
            });

        this.homeActivityIndicatorService.notBusy();
    }

    private initImagesState(lostObject: LostObject) {
        let result: Array<Image> = [{ url: this.noPhotoUrl } as Image];
        if (lostObject.photos && lostObject.photos.length > 0) {
            result = lostObject.photos;
            for (let i = 0; i < lostObject.photos.length; i++) {
                if (lostObject.photos[i].ordinal && lostObject.photos[i].ordinal > this.maxOrdinal) {
                    this.maxOrdinal = lostObject.photos[i].ordinal;
                }
            }
        }
        this.images = result;
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

    public onMapReady = (event) => {
        this.mapView = event.object;
    };

    public saveLostObject(update: boolean) {
        this.lostObjectService.update(this.populateLostObject(), this.lostObject.id)
            .then(() => {
                this.routeUtils.routeTo("/home/found");
            });
    }

    public cancelEditing() {
        this.routeUtils.routeTo("/home/found");
    }

    private populateImage(uuid: string, url: string) {
        let image: Image = {} as Image;
        image.uuid = uuid;
        image.url = url;
        image.ordinal = this.maxOrdinal++;
        return image;
    }

    private populateLostObject(): LostObject {
        let lostObject: LostObject = {} as LostObject;
        lostObject.createdById = this.appUser.id;
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = this.lostObject.publishTimestamp;
        lostObject.lastUpdateTimestamp = new Date().getTime();
        lostObject.location = [this.mapView["latitude"] , this.mapView["longitude"]];
        lostObject.username = this.appUser.username;
        lostObject.photos = this.images;
        return lostObject;
    }

    public deleteLostObject() {
        this.lostObjectService.delete(this.lostObject.id)
            .then(() => this.routeUtils.routeTo("/home/found"));
    }

    get name() {
        return this.lostObjectEditForm.get("name");
    }
    
    get description() {
        return this.lostObjectEditForm.get("description");
    }

}