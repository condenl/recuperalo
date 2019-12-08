import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';
import { Image } from '../shared/image';
import { UUIDUtils } from '../shared/uuid-utils';
import { ImageService } from '../shared/image.service';
import { localize } from "nativescript-localize";
import { SwipeDirection, SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { ImageReorderComponent } from '../image-reorder/image-reorder.component';
import { ModalService } from '../shared/modal.service';

var Toast = require("nativescript-toast");

@Component({
    selector: 'ns-lost-object-edit',
    moduleId: module.id,
    templateUrl: './lost-object-edit.component.html',
    styleUrls: ['./lost-object-edit.component.css']
})
export class LostObjectEditComponent implements OnInit {

    private images: Array<Image>;

    private lostObjectEditForm: FormGroup;

    private lostObject: LostObject;

    private mapView: MapView;

    private appUser: AppUser;

    private noPhotos: boolean;

    private defaultPhoto: Image;

    private currentPhotoUid: string;

    public swipeFnHolder = { fn: null, applyOn: null };

    public updatingSlider: boolean = false;

    private mapLatSelected;

    private mapLongSelected;

    constructor(private lostObjectService: LostObjectService, 
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private routeUtils: RouteUtilsService,
        private imageService: ImageService,
        private modalService: ModalService,
        private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { appUser: AppUser;
                    noPhotoUrl: string; 
                    lostObject: any }) => {
                this.lostObject = data.lostObject;
                this.mapLatSelected = this.lostObject.location[0];
                this.mapLongSelected = this.lostObject.location[1];
                this.appUser = data.appUser;
                this.lostObjectEditForm = this.formBuilder.group({
                    name: [this.lostObject.name, Validators.required],
                    description: [this.lostObject.description, Validators.required]
                });
                this.defaultPhoto = { url: data.noPhotoUrl } as Image;
                this.noPhotos = !(this.lostObject.photos && this.lostObject.photos.length > 0);
                this.images = this.noPhotos ? [this.defaultPhoto] : this.lostObject.photos;
            });

        this.homeActivityIndicatorService.notBusy();
    }

    public choosePhoto(): void {
        this.imageService.openImagePicker().then(selection => 
            selection.forEach(selected => {
                this.updatingSlider = true;
                let uuid = UUIDUtils.uuidv4();
                this.lostObjectService.uploadImage(selected, uuid)
                    .then(remoteUrl => {
                        if (this.noPhotos) {
                            this.noPhotos = false;
                            this.images.shift();
                        }
                        this.images.push(this.populateImage(uuid, remoteUrl));
                        this.updatingSlider = false;
                    });
            })
        );
    }

    public removePhoto() {
        if (this.noPhotos) {
            Toast.makeText(localize("com.recuperalo.mobile.no-photos")).show();
            return;
        }
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].uuid == this.currentPhotoUid) {
                this.swipeFnHolder.fn.apply(this.swipeFnHolder.applyOn, [{ direction: SwipeDirection.right } as SwipeGestureEventData]);
                this.images.splice(i, 1);
                break;
            }
        }
        if (!this.images || this.images.length == 0) {
            this.images = [this.defaultPhoto];
            this.noPhotos = true;
        }
    }

    public currentPhoto(uid: string): void {
        this.currentPhotoUid = uid;
    }

    private populateImage(uuid: string, url: string) {
        let image: Image = {} as Image;
        image.uuid = uuid;
        image.url = url;
        return image;
    }

    public reorderPhotos() {
        if (!this.images || this.images.length == 0 || this.noPhotos) {
            Toast.makeText(localize("com.recuperalo.mobile.no-photos")).show();
            return;
        }
        this.modalService.show(ImageReorderComponent, this.viewContainerRef, this.images, false);
    }

    private populateLostObject(): LostObject {
        let lostObject: LostObject = {} as LostObject;
        lostObject.createdById = this.appUser.id;
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = this.lostObject.publishTimestamp;
        lostObject.lastUpdateTimestamp = new Date().getTime();
        lostObject.location = [this.mapLatSelected, this.mapLongSelected];
        lostObject.username = this.appUser.username;
        lostObject.photos = this.images;
        return lostObject;
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
        this.mapView.settings.zoomControlsEnabled = true;
        this.mapView.settings.zoomGesturesEnabled = true;
        this.mapView.latitude = this.mapLatSelected;
        this.mapView.longitude = this.mapLongSelected;
        this.mapView.zoom = 9;
        this.addMapMarker(this.mapLatSelected, this.mapLongSelected)
    };

    public onCoordinateLongPress(args) {
        this.mapLatSelected = args.position.latitude;
        this.mapLongSelected = args.position.longitude;
        this.addMapMarker(this.mapLatSelected, this.mapLongSelected);
    }

    private addMapMarker(lat, long) {
        this.mapView.removeAllMarkers();
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(lat, long);
        this.mapView.addMarker(marker);
    }

    public saveLostObject(update: boolean) {
        this.lostObjectService.update(this.populateLostObject(), this.lostObject.id)
            .then(() => {
                this.routeUtils.routeTo("/home");
            });
    }

    public cancelEditing() {
        this.routeUtils.routeTo("/home");
    }

    public deleteLostObject() {
        this.lostObjectService.delete(this.lostObject.id)
            .then(() => this.routeUtils.routeTo("/home"));
    }

    get name() {
        return this.lostObjectEditForm.get("name");
    }
    
    get description() {
        return this.lostObjectEditForm.get("description");
    }

}