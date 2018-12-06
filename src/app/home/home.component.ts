import { Component, OnInit } from '@angular/core';
import { RouteUtilsService } from '~/app/route/route-utils.service';
import { LoaderUtilsService } from '~/app/shared/loader-utils.service';

@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private routeUtils: RouteUtilsService, private loaderUtils: LoaderUtilsService) { }

  ngOnInit() {
  }

  public routeTo(path: string): void {
    this.loaderUtils.show();
    this.routeUtils.routeTo(path, "slideTop");
  }

}
