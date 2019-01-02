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

    public masterLostObjectWrappers: Array<any> = [];

    public filteredDataset: Array<any> = [];

    public dateUtils: DateUtils;

    constructor(private lostObjectService: LostObjectService, 
        private loaderUtils: LoaderUtilsService,
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private loginService: LoginService,
        private routeUtils: RouteUtilsService) { }

    ngOnInit(): void {
        console.log("LostObjectFoundComponent ngOnInit");
        this.route
            .data
            .subscribe(
                (data: { lostObjectWrappers: any }) => {
                    console.log("response just came in!");
                    let keys = Object.keys(data.lostObjectWrappers);
                    this.masterLostObjectWrappers = data.lostObjectWrappers;
                    this.filteredDataset = this.masterLostObjectWrappers;
                    console.log("ngoninit");
                }
            );
        this.homeActivityIndicatorService.notBusy();
    }

    public extractValue(wrapper: any): LostObject {
        console.log("extractValue: " + wrapper);
        console.dir(wrapper);
        return wrapper[Object.keys(wrapper)[0]];
    }

    public extractKey(wrapper: any): string {
        console.log("step 3");
        console.dir(wrapper);
        return Object.keys(wrapper)[0];
    }

    public toDate(ts: number): Date {
        return DateUtils.toDate(ts);    
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        this.filteredDataset = [];
        for (let i = 0; i < this.masterLostObjectWrappers.length; i++) {
            if(this.masterLostObjectWrappers[i][Object.keys(this.masterLostObjectWrappers[i])[0]].name.toLowerCase().includes(searchBar.text.toLowerCase())) {
                this.filteredDataset.push(this.masterLostObjectWrappers[i]);
            }
        }
    }

    public onItemTap(event) {
        this.routeUtils.routeTo("lost-object-view/" + Object.keys(this.filteredDataset[event.index])[0]);
    }

}