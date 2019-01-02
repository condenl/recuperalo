import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { switchMap } from "rxjs/operators";
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerElement } from "nativescript-angular/element-registry";
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { AppUser } from '~/app/shared/app-user';

var fs = require("tns-core-modules/file-system");
var imagepicker = require("nativescript-imagepicker");

@Component({
    selector: 'ns-lost-object-edit',
    moduleId: module.id,
    templateUrl: './lost-object-edit.component.html',
    styleUrls: ['./lost-object-edit.component.css']
})
export class LostObjectEditComponent implements OnInit {

    private lostObjectImageUrl: string;

    private lostObjectCreateForm: FormGroup;

    private lostObjectFirebaseKey: string;

    private lostObject: LostObject;

    private mapView: MapView;

    private appUser: AppUser;

    constructor(private lostObjectService: LostObjectService, 
        private loaderUtils: LoaderUtilsService,
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private loginService: LoginService,
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        this.route
            .data
            .subscribe((data: { imageUrl: string; 
                    appUser: AppUser;
                    lostObject: any }) => {
                this.lostObjectImageUrl = data.imageUrl;
                console.log(data.lostObject);
                this.lostObjectFirebaseKey = Object.keys(data.lostObject)[0];
                this.lostObject = data.lostObject[this.lostObjectFirebaseKey];
                console.log(this.lostObject);
                this.appUser = data.appUser[Object.keys(data.appUser)[0]];
                this.lostObjectCreateForm = this.formBuilder.group({
                    name: [this.lostObject.name, Validators.required],
                    description: [this.lostObject.description, Validators.required]
                });
            });

        this.homeActivityIndicatorService.notBusy();
    }

    public choosePicture(): void {
        let context = imagepicker.create({ mode: "single" });
        context.authorize().then(
            () => context.present()
        ).then(selection => {
            selection.forEach(selected => {
            console.log("about to upload the lost object image");
            this.lostObjectService.uploadImage(selected, this.loginService.getCurrentUid() + "-" + this.lostObject.publishTimestamp)
                .then(remoteUrl => this.lostObjectImageUrl = remoteUrl);
            })
        });
        
    }

    public onMapReady = (event) => {
        this.mapView = event.object;
    };

    public editLostObject(update: boolean) {
        if (update) {
            this.lostObjectService.update(this.populateLostObject(), this.lostObjectFirebaseKey)
                .then(() => {
                    this.lostObjectCreateForm.reset();
                    this.routeUtils.routeTo("/home/found");
                });
        } else {
            this.lostObjectCreateForm.reset();
            this.routeUtils.routeTo("/home/found");
        }
    }

    private populateLostObject(): LostObject {
        let lostObject: LostObject = {} as LostObject;
        lostObject.createdBy = this.loginService.getCurrentUid();
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = this.lostObject.publishTimestamp;
        lostObject.lastUpdateTimestamp = new Date().getTime();
        lostObject.location = [this.mapView["latitude"] , this.mapView["longitude"]];
        lostObject.username = this.appUser.username;
        return lostObject;
    }

    public deleteLostObject() {
        this.lostObjectService.delete(this.lostObjectFirebaseKey)
            .then(() => this.routeUtils.routeTo("/home/found"));
    }

    get name() {
        return this.lostObjectCreateForm.get("name");
    }
    
    get description() {
        return this.lostObjectCreateForm.get("description");
    }

}