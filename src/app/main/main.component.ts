import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-main',
  moduleId: module.id,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  
  public segmentedBarItems: Array<SegmentedBarItem>;

  private tabNavigation: boolean = false;

  constructor(private routeUtils: RouteUtilsService, 
    private loaderUtils: LoaderUtilsService, 
    private homeActivityIndicatorService: HomeActivityIndicatorService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.homeActivityIndicatorService
      .getState()
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.tabNavigation = state;
        this.changeDetector.detectChanges();
      });
    this.segmentedBarItems = [];
    this.buildHeaderBar();
  }

  private buildHeaderBar() {
    this.addBarItem(localize("com.recuperalo.mobile.main.home"), this.segmentedBarItems);
    this.addBarItem(localize("com.recuperalo.mobile.main.chats"), this.segmentedBarItems);
    this.addBarItem(localize("com.recuperalo.mobile.main.found"), this.segmentedBarItems);
    this.addBarItem(localize("com.recuperalo.mobile.create"), this.segmentedBarItems);
  }

  private addBarItem(title: string, barItems: any) {
    let item = new SegmentedBarItem();
    item.title = title;
    barItems.push(item);
  }

  public onSelectedIndexChange(args) {
    console.log("onSelectedIndexChange has run");
    let segmentedBar = <SegmentedBar>args.object;
    this.tabNavigation = true;
    console.log("routing from home: ", segmentedBar.selectedIndex);
    switch (segmentedBar.selectedIndex) {
      case 0: 
        this.routeUtils.routeTo("/home/list");
        break;
      case 1:
        break;
      case 2:
        this.routeUtils.routeTo("/home/found");
        break;
      case 3:
        this.routeUtils.routeTo("/home/create");
        break;
    }
  }

  public routeTo(path: string): void {
    this.loaderUtils.show();
    this.routeUtils.routeTo(path, "slideTop");
  }

  ngOnDestroy() {
    // empty hook for ngx-take-until-destroy
  }

}
