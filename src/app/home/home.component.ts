import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { HomeActivityIndicatorService } from '~/app/shared/home-activity-indicator.service';

@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public segmentedBarItems: Array<SegmentedBarItem>;

  private tabNavigation: boolean = false;

  constructor(private routeUtils: RouteUtilsService, 
    private loaderUtils: LoaderUtilsService, 
    private homeActivityIndicatorService: HomeActivityIndicatorService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.homeActivityIndicatorService
      .getState()
      .subscribe((state) => {
        this.tabNavigation = state;
        this.changeDetector.detectChanges();
      });

    this.segmentedBarItems = [];
    let item = new SegmentedBarItem();
    item.title = "Home";

    this.segmentedBarItems.push(item);
    item = new SegmentedBarItem();
    item.title = "Chats";

    this.segmentedBarItems.push(item);
    item = new SegmentedBarItem();
    item.title = "Found";

    this.segmentedBarItems.push(item);
    item = new SegmentedBarItem();
    item.title = "Publish";
    this.segmentedBarItems.push(item);
  }

  public onSelectedIndexChange(args) {
    let segmentedBar = <SegmentedBar>args.object;
    this.tabNavigation = true;
    console.log("routing from home: ", segmentedBar.selectedIndex);
    switch (segmentedBar.selectedIndex) {
      case 0: 
        this.routeUtils.routeTo("/home/lost-object-list");
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

}
