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
    selector: 'ns-lost-object-view',
    moduleId: module.id,
    templateUrl: './lost-object-view.component.html',
    styleUrls: ['./lost-object-view.component.css']
})
export class LostObjectViewComponent implements OnInit {

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
            });

        this.homeActivityIndicatorService.notBusy();
    }

    public contact() {

    }

    public onMapReady = (event) => {
        this.mapView = event.object;
    };

}