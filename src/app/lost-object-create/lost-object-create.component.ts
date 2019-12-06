import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LostObject } from '~/app/shared/lost-object';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';
import { UUIDUtils } from '../shared/uuid-utils';
import { Image } from '../shared/image';
import { ModalService } from '../shared/modal.service';
import { ImageReorderComponent } from '../image-reorder/image-reorder.component';
import { ImageService } from '../shared/image.service';
import { localize } from "nativescript-localize";
import { SwipeDirection, SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

var Toast = require("nativescript-toast");

@Component({
    selector: 'ns-lost-object-create',
    moduleId: module.id,
    templateUrl: './lost-object-create.component.html',
    styleUrls: ['./lost-object-create.component.css']
})
export class LostObjectCreateComponent implements OnInit {

    private images: Array<Image>;

    private lostObjectCreateForm: FormGroup;

    private mapView: MapView;

    private appUser: AppUser;

    private noPhotos: boolean = true;

    private defaultPhoto: Image;

    private currentPhotoUid: string;

    public swipeFnHolder = { fn: null, applyOn: null };

    public updatingSlider: boolean = false;

    constructor(private lostObjectService: LostObjectService, 
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private routeUtils: RouteUtilsService, 
        private viewContainerRef: ViewContainerRef,
        private imageService: ImageService,
        private modalService: ModalService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { noPhotoUrl: string; 
                    appUser: AppUser }) => {
                this.appUser = data.appUser;
                this.defaultPhoto = { url: data.noPhotoUrl } as Image;
                this.images = [this.defaultPhoto];
            });

        this.lostObjectCreateForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
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
                this.images.splice(i, 1);
                this.swipeFnHolder.fn.apply(this.swipeFnHolder.applyOn, [{ direction: SwipeDirection.left } as SwipeGestureEventData]);
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
        }
        this.modalService.show(ImageReorderComponent, this.viewContainerRef, this.images, false);
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
        this.mapView.settings.compassEnabled = true;
        this.mapView.settings.indoorLevelPickerEnabled = true;
        this.mapView.settings.mapToolbarEnabled = true;
        this.mapView.settings.myLocationButtonEnabled = true;
        this.mapView.settings.rotateGesturesEnabled = true;
        this.mapView.settings.scrollGesturesEnabled = true;
        this.mapView.settings.tiltGesturesEnabled = true;
        this.mapView.settings.zoomControlsEnabled = true;
        this.mapView.settings.zoomGesturesEnabled = true;

        console.log("Setting a marker...");
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(-33.86, 151.20);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    };

    public createLostObject() {
        this.lostObjectService.create(this.populateLostObject())
            .then(() => this.routeUtils.routeTo("/home/found"));
    }

    private populateLostObject(): LostObject {
        let currentDateTime = new Date().getTime();
        let lostObject: LostObject = {} as LostObject;
        lostObject.createdById = this.appUser.id;
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = currentDateTime;
        lostObject.lastUpdateTimestamp = currentDateTime;
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