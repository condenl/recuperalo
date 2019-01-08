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
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: 'ns-lost-object-create',
    moduleId: module.id,
    templateUrl: './lost-object-create.component.html',
    styleUrls: ['./lost-object-create.component.css']
})
export class LostObjectCreateComponent implements OnInit {

    private lostObjectImageUrl: string;

    private lostObjectCreateForm: FormGroup;

    private mapView: MapView;

    private appUser: AppUser;

    private publishTimestamp: number;

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
            .subscribe((data: { noPhotoUrl: string; 
                    appUser: AppUser }) => {
                this.lostObjectImageUrl = data.noPhotoUrl;
                this.appUser = data.appUser[Object.keys(data.appUser)[0]];
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
            this.lostObjectService.uploadImage(selected, this.loginService.getCurrentUid() + "-" + this.publishTimestamp)
                .then(remoteUrl => this.lostObjectImageUrl = remoteUrl);
            })
        });
        
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
        lostObject.createdBy = this.loginService.getCurrentUid();
        lostObject.name = this.name.value;
        lostObject.description = this.description.value;
        lostObject.publishTimestamp = this.publishTimestamp;
        lostObject.lastUpdateTimestamp = this.publishTimestamp;
        lostObject.location = [this.mapView["latitude"] , this.mapView["longitude"]];
        lostObject.username = this.appUser.username;
        return lostObject;
    }

    get name() {
        return this.lostObjectCreateForm.get("name");
    }
    
    get description() {
        return this.lostObjectCreateForm.get("description");
    }

}