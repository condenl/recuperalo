import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { AdService } from '~/app/shared/ad.service';
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { ActivatedRoute } from '@angular/router';
import { LostObject, resolvePrimaryPhoto } from '~/app/shared/lost-object';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { DateUtils } from '~/app/shared/date-utils';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Image } from '../shared/image';
import { Subscription, interval } from "rxjs";
import { AppUser } from '../shared/app-user';
import { AppUserService } from '../shared/app-user.service';


@Component({
    selector: 'ns-lost-object-list',
    moduleId: module.id,
    templateUrl: './lost-object-list.component.html',
    styleUrls: ['./lost-object-list.component.css']
})
export class LostObjectListComponent implements OnInit, OnDestroy {

    public masterLostObjects: Array<any> = [];

    public filteredDataset: Array<any> = [];

    public dateUtils: DateUtils;

    public detailUrl: string;

    public noPhotoUrl: string;

    public detailNavigation: boolean = false;

    private pointsTask$: Subscription;

    private appUser: AppUser;

    @ViewChild('contentView', { static: false }) contentView: ElementRef;

    constructor(private route: ActivatedRoute, 
        private homeActivityIndicatorService: HomeActivityIndicatorService,
        private routeUtils: RouteUtilsService,
        private adService: AdService,
        private appUserService: AppUserService) { }

    ngOnInit(): void {
        console.log("LostObjectListComponent ngOnInit");
        this.route
            .data
            .subscribe((data: { appUser: AppUser; lostObjects: any; noPhotoUrl: string; detailUrl: string }) => {
                    this.detailUrl = data.detailUrl;
                    this.noPhotoUrl = data.noPhotoUrl;
                    this.masterLostObjects = data.lostObjects;
                    this.filteredDataset = [...data.lostObjects]
                    this.appUser = data.appUser;
                }
            );
        this.homeActivityIndicatorService.notBusy();
        setTimeout(() => this.adService.showBanner(), 2000);
        this.pointsTask$ = this.startUpdatePointsTask();
    }

    // scheduled task for updating app-user points based on the amount of time the user spends using app 
    private startUpdatePointsTask(): Subscription {
        return interval(1000 * 5).subscribe(data => {
            this.appUser.points = this.appUser.points ? this.appUser.points + 1 : 1;
            this.appUserService.update(this.appUser, this.appUser.id);
        });
    }

    public toDate(ts: number): Date {
        return DateUtils.toDate(ts);
    }

    public getPrimaryPhoto(lostObject: LostObject): Image {
        return resolvePrimaryPhoto(lostObject, this.noPhotoUrl);
    }

    public onTextChanged(args) {
        let term = (<SearchBar>args.object).text.toLowerCase();
        this.filteredDataset = [];
        for (let i = 0; i < this.masterLostObjects.length; i++) {
            if (this.masterLostObjects[i].name.toLowerCase().includes(term)) {
                this.filteredDataset.push(this.masterLostObjects[i]);
            }
        }
    }

    public onItemTap(event) {
        this.detailNavigation = true;
        this.routeUtils.routeTo(this.detailUrl + this.filteredDataset[event.index].id);
    }

    ngOnDestroy() {
        if (this.pointsTask$) {
            this.pointsTask$.unsubscribe();
        }
    }

}