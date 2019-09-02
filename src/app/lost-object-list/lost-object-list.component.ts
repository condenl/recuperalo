import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LostObjectService } from '~/app/shared/lost-object.service';
import { switchMap } from "rxjs/operators";
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { AdService } from '~/app/shared/ad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerElement } from "nativescript-angular/element-registry";
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '~/app/shared/login.service';
import { LostObject } from '~/app/shared/lost-object';
import { MapView } from 'nativescript-google-maps-sdk';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { DateUtils } from '~/app/shared/date-utils';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Image } from 'tns-core-modules/ui/image/image';

const imageSourceModule = require("tns-core-modules/image-source");
const fileSystemModule = require("tns-core-modules/file-system");

@Component({
    selector: 'ns-lost-object-list',
    moduleId: module.id,
    templateUrl: './lost-object-list.component.html',
    styleUrls: ['./lost-object-list.component.css']
})
export class LostObjectListComponent implements OnInit {

    public masterLostObjects: Array<any> = [];

    public filteredDataset: Array<any> = [];

    public dateUtils: DateUtils;

    public detailUrl: string;

    public detailNavigation: boolean = false;

    constructor(private lostObjectService: LostObjectService, 
        private loaderUtils: LoaderUtilsService,
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private loginService: LoginService,
        private routeUtils: RouteUtilsService,
        private adService: AdService) { }

    ngOnInit(): void {
        console.log("LostObjectListComponent ngOnInit");
        this.route
            .data
            .subscribe((data: { lostObjects: any, detailUrl: string }) => {
                    console.log("LostObjectListComponent response just came in!");
                    this.detailUrl = data.detailUrl;
                    if (data.lostObjects != null) {
                        this.masterLostObjects = data.lostObjects;
                        this.filteredDataset = [];
                        let aux;
                        for (let idx in data.lostObjects) {
                            this.populatePhotoUrl(data.lostObjects[idx]);
                            aux = {};
                            aux[idx] = data.lostObjects[idx];
                            this.filteredDataset.push(aux);
                        }
                    }
                }
            );
        this.homeActivityIndicatorService.notBusy();
        // this.adService.showBanner();
    }

    public populatePhotoUrl(lostObject: any) {
        this.lostObjectService.getImage(lostObject.createdBy + "-" + lostObject.publishTimestamp)
            .then(url => {
                console.log("url obtained: ", url);
                lostObject.photoUrl = url;
        });
    }

    public extractKey(wrapper: any): string {
        return Object.keys(wrapper)[0];
    }

    public ev(wrapper: any): LostObject {
        return wrapper[Object.keys(wrapper)[0]];
    }

    public toDate(ts: number): Date {
        return DateUtils.toDate(ts);    
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        this.filteredDataset = [];
        let keys = Object.keys(this.masterLostObjects);
        for (let i = 0; i < keys.length; i++) {
            if (this.masterLostObjects[keys[i]].name.toLowerCase().includes(searchBar.text.toLowerCase())) {
                let aux = {};
                aux[keys[i]] = this.masterLostObjects[keys[i]];
                this.filteredDataset.push(aux);
            }
        }
    }

    public onItemTap(event) {
        this.detailNavigation = true;
        this.routeUtils.routeTo(this.detailUrl + Object.keys(this.filteredDataset[event.index])[0]);
    }

}